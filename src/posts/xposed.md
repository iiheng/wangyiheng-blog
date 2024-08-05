---
date: 2024-08-03
category:
- xposed
tag:
- Hook
- Xposed
archive: true
---

# xposed摄像头hook教程
> 主要有两点重点
> 1. 拦截摄像头，将他的数据替换到一个virtual 的surface上面，主要是为了保活
> 2. 获取播放摄像头数据的surface，然后将自己的内容投到这上面


## 1. 拦截摄像头
> 有3个摄像头的api接口可以被拦截，一个是camera1，camera2，以及camerax这个三个接口

### 1.1 拦截camera1




### 1.2 拦截camera2

#### 首先我们需要先了解正常Camera2调用的流程：
1. 获取CameraManager：

    通过 `context.getSystemService(Context.CAMERA_SERVICE)` 获取` CameraManager `实例。这是使用`Camera2 API`的起点。

2. 选择相机：

    通过`cameraManager.getCameraIdList()`获取所有可用的相机，然后选择一个。

3. 打开相机：

    通过`cameraManager.openCamera(cameraId, stateCallback, backgroundHandler)`打开相机。

4. 创建CaptureRequest.Builder：

    通过`cameraDevice.createCaptureRequest(CameraDevice.TEMPLATE_PREVIEW)`创建`CaptureRequest.Builder`实例。

5. 创建CameraCaptureSession：

    通过`cameraDevice.createCaptureSession(listOf(surface), object : CameraCaptureSession.StateCallback() {...}, null)`创建`CameraCaptureSession`实例。

6. 开始预览：

    通过`captureSession.setRepeatingRequest(captureRequestBuilder.build(), null, backgroundHandler)`开始预览。

通过上面的讲解，我们就可以开始第一步，进行camera2的hook了

<details>
<summary><strong>camera2 实际调用代码</strong></summary>

```
private lateinit var cameraManager: CameraManager
private var cameraDevice: CameraDevice? = null
private lateinit var captureSession: CameraCaptureSession
private lateinit var captureRequestBuilder: CaptureRequest.Builder
private lateinit var imageReader: ImageReader
private lateinit var backgroundHandler: Handler
private lateinit var backgroundThread: HandlerThread
// 1. 获取CameraManager
val cameraManager = context.getSystemService(Context.CAMERA_SERVICE) as CameraManager

 // 2. 选择相机
val cameraId = cameraManager.cameraIdList[0]  // 通常使用第一个相机（后置）

// 3. 打开相机
if (ActivityCompat.checkSelfPermission(context, Manifest.permission.CAMERA) == PackageManager.PERMISSION_GRANTED) {
    cameraManager.openCamera(cameraId, stateCallback, backgroundHandler)
}


private val stateCallback = object : CameraDevice.StateCallback() {
    override fun onOpened(camera: CameraDevice) {
        cameraDevice = camera
        createCameraPreviewSession()
    }

    override fun onDisconnected(camera: CameraDevice) {
        camera.close()
    }

    override fun onError(camera: CameraDevice, error: Int) {
        camera.close()
        cameraDevice = null
    }
}

private fun createCameraPreviewSession() {
    val surface = Surface(textureView.surfaceTexture)

    // 4. 创建CaptureRequest.Builder
    captureRequestBuilder = cameraDevice!!.createCaptureRequest(CameraDevice.TEMPLATE_PREVIEW)
    captureRequestBuilder.addTarget(surface)

    // 5. 创建CameraCaptureSession
    cameraDevice?.createCaptureSession(listOf(surface), object : CameraCaptureSession.StateCallback() {
        override fun onConfigured(session: CameraCaptureSession) {
            captureSession = session
            updatePreview()
        }

        override fun onConfigureFailed(session: CameraCaptureSession) {
            // 处理配置失败的情况
        }
    }, null)
}

private fun updatePreview() {
    // 6. 开始预览
    captureRequestBuilder.set(CaptureRequest.CONTROL_MODE, CameraMetadata.CONTROL_MODE_AUTO)
    captureSession.setRepeatingRequest(captureRequestBuilder.build(), null, backgroundHandler)
}

```
</details>

#### 下面正式讲解camera2的hook过程，有哪些api我们需要hook的：
通过Hook`android.hardware.camera2.CameraManager`类的`openCamera`方法来获取`CameraDevice.StateCallback`

然后Hook`CameraDevice.StateCallback`回调的`onOpened`的方法来获取`CameraDevice`

然后Hook`CameraDevice`的`cameraDevice.createCaptureRequest`来获得`captureRequestBuilder`

然后Hook`captureRequestBuilder`的`addTarget`方法来获得`surface`
> 这个surface是我们之后需要进行投放视频的，所以先保存着

最后Hook`captureRequestBuilder`的`build`方法来启动播放


```
ava_vm_ext.cc:577] JNI DETECTED ERROR IN APPLICATION: non-zero capacity for nullptr pointer: 1
                                                                                                    java_vm_ext.cc:577]     in call to NewDirectByteBuffer
                                                                                                    java_vm_ext.cc:577]     from android.media.ImageReader$SurfaceImage$SurfacePlane[] android.media.ImageReader$SurfaceImage.nativeCreatePlanes(int, int)

```
### 1.3 拦截camerax

