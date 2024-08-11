import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,o as n,f as s}from"./app-vg0GsebR.js";const i={},r=s(`<h1 id="xposed摄像头hook教程" tabindex="-1"><a class="header-anchor" href="#xposed摄像头hook教程"><span>xposed摄像头hook教程</span></a></h1><blockquote><p>主要有两点重点</p><ol><li>拦截摄像头，将他的数据替换到一个virtual 的surface上面，主要是为了保活</li><li>获取播放摄像头数据的surface，然后将自己的内容投到这上面</li></ol></blockquote><h2 id="_1-拦截摄像头" tabindex="-1"><a class="header-anchor" href="#_1-拦截摄像头"><span>1. 拦截摄像头</span></a></h2><blockquote><p>有3个摄像头的api接口可以被拦截，一个是camera1，camera2，以及camerax这个三个接口</p></blockquote><h3 id="_1-1-拦截camera1" tabindex="-1"><a class="header-anchor" href="#_1-1-拦截camera1"><span>1.1 拦截camera1</span></a></h3><h3 id="_1-2-拦截camera2" tabindex="-1"><a class="header-anchor" href="#_1-2-拦截camera2"><span>1.2 拦截camera2</span></a></h3><h4 id="首先我们需要先了解正常camera2调用的流程" tabindex="-1"><a class="header-anchor" href="#首先我们需要先了解正常camera2调用的流程"><span>首先我们需要先了解正常Camera2调用的流程：</span></a></h4><ol><li><p>获取CameraManager：</p><p>通过 <code>context.getSystemService(Context.CAMERA_SERVICE)</code> 获取<code>CameraManager</code>实例。这是使用<code>Camera2 API</code>的起点。</p></li><li><p>选择相机：</p><p>通过<code>cameraManager.getCameraIdList()</code>获取所有可用的相机，然后选择一个。</p></li><li><p>打开相机：</p><p>通过<code>cameraManager.openCamera(cameraId, stateCallback, backgroundHandler)</code>打开相机。</p></li><li><p>创建CaptureRequest.Builder：</p><p>通过<code>cameraDevice.createCaptureRequest(CameraDevice.TEMPLATE_PREVIEW)</code>创建<code>CaptureRequest.Builder</code>实例。</p></li><li><p>创建CameraCaptureSession：</p><p>通过<code>cameraDevice.createCaptureSession(listOf(surface), object : CameraCaptureSession.StateCallback() {...}, null)</code>创建<code>CameraCaptureSession</code>实例。</p></li><li><p>开始预览：</p><p>通过<code>captureSession.setRepeatingRequest(captureRequestBuilder.build(), null, backgroundHandler)</code>开始预览。</p></li></ol><p>通过上面的讲解，我们就可以开始第一步，进行camera2的hook了</p><details><summary><strong>camera2 实际调用代码</strong></summary><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>private lateinit var cameraManager: CameraManager</span></span>
<span class="line"><span>private var cameraDevice: CameraDevice? = null</span></span>
<span class="line"><span>private lateinit var captureSession: CameraCaptureSession</span></span>
<span class="line"><span>private lateinit var captureRequestBuilder: CaptureRequest.Builder</span></span>
<span class="line"><span>private lateinit var imageReader: ImageReader</span></span>
<span class="line"><span>private lateinit var backgroundHandler: Handler</span></span>
<span class="line"><span>private lateinit var backgroundThread: HandlerThread</span></span>
<span class="line"><span>// 1. 获取CameraManager</span></span>
<span class="line"><span>val cameraManager = context.getSystemService(Context.CAMERA_SERVICE) as CameraManager</span></span>
<span class="line"><span></span></span>
<span class="line"><span> // 2. 选择相机</span></span>
<span class="line"><span>val cameraId = cameraManager.cameraIdList[0]  // 通常使用第一个相机（后置）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 3. 打开相机</span></span>
<span class="line"><span>if (ActivityCompat.checkSelfPermission(context, Manifest.permission.CAMERA) == PackageManager.PERMISSION_GRANTED) {</span></span>
<span class="line"><span>    cameraManager.openCamera(cameraId, stateCallback, backgroundHandler)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>private val stateCallback = object : CameraDevice.StateCallback() {</span></span>
<span class="line"><span>    override fun onOpened(camera: CameraDevice) {</span></span>
<span class="line"><span>        cameraDevice = camera</span></span>
<span class="line"><span>        createCameraPreviewSession()</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    override fun onDisconnected(camera: CameraDevice) {</span></span>
<span class="line"><span>        camera.close()</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    override fun onError(camera: CameraDevice, error: Int) {</span></span>
<span class="line"><span>        camera.close()</span></span>
<span class="line"><span>        cameraDevice = null</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>private fun createCameraPreviewSession() {</span></span>
<span class="line"><span>    val surface = Surface(textureView.surfaceTexture)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 4. 创建CaptureRequest.Builder</span></span>
<span class="line"><span>    captureRequestBuilder = cameraDevice!!.createCaptureRequest(CameraDevice.TEMPLATE_PREVIEW)</span></span>
<span class="line"><span>    captureRequestBuilder.addTarget(surface)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 5. 创建CameraCaptureSession</span></span>
<span class="line"><span>    cameraDevice?.createCaptureSession(listOf(surface), object : CameraCaptureSession.StateCallback() {</span></span>
<span class="line"><span>        override fun onConfigured(session: CameraCaptureSession) {</span></span>
<span class="line"><span>            captureSession = session</span></span>
<span class="line"><span>            updatePreview()</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        override fun onConfigureFailed(session: CameraCaptureSession) {</span></span>
<span class="line"><span>            // 处理配置失败的情况</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }, null)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>private fun updatePreview() {</span></span>
<span class="line"><span>    // 6. 开始预览</span></span>
<span class="line"><span>    captureRequestBuilder.set(CaptureRequest.CONTROL_MODE, CameraMetadata.CONTROL_MODE_AUTO)</span></span>
<span class="line"><span>    captureSession.setRepeatingRequest(captureRequestBuilder.build(), null, backgroundHandler)</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h4 id="下面正式讲解camera2的hook过程-有哪些api我们需要hook的" tabindex="-1"><a class="header-anchor" href="#下面正式讲解camera2的hook过程-有哪些api我们需要hook的"><span>下面正式讲解camera2的hook过程，有哪些api我们需要hook的：</span></a></h4><p>通过Hook<code>android.hardware.camera2.CameraManager</code>类的<code>openCamera</code>方法来获取<code>CameraDevice.StateCallback</code></p><p>然后Hook<code>CameraDevice.StateCallback</code>回调的<code>onOpened</code>的方法来获取<code>CameraDevice</code></p><p>然后Hook<code>CameraDevice</code>的<code>cameraDevice.createCaptureRequest</code>来获得<code>captureRequestBuilder</code></p><p>然后Hook<code>captureRequestBuilder</code>的<code>addTarget</code>方法来获得<code>surface</code></p><blockquote><p>这个surface是我们之后需要进行投放视频的，所以先保存着</p></blockquote><p>最后Hook<code>captureRequestBuilder</code>的<code>build</code>方法来启动播放</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>ava_vm_ext.cc:577] JNI DETECTED ERROR IN APPLICATION: non-zero capacity for nullptr pointer: 1</span></span>
<span class="line"><span>                                                                                                    java_vm_ext.cc:577]     in call to NewDirectByteBuffer</span></span>
<span class="line"><span>                                                                                                    java_vm_ext.cc:577]     from android.media.ImageReader$SurfaceImage$SurfacePlane[] android.media.ImageReader$SurfaceImage.nativeCreatePlanes(int, int)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-3-拦截camerax" tabindex="-1"><a class="header-anchor" href="#_1-3-拦截camerax"><span>1.3 拦截camerax</span></a></h3><h2 id="_2-获取播放摄像头数据的surface" tabindex="-1"><a class="header-anchor" href="#_2-获取播放摄像头数据的surface"><span>2. 获取播放摄像头数据的surface</span></a></h2><h2 id="_3-模块向宿主传递信息" tabindex="-1"><a class="header-anchor" href="#_3-模块向宿主传递信息"><span>3. 模块向宿主传递信息</span></a></h2><h3 id="_1-通过contentprovider进行传递" tabindex="-1"><a class="header-anchor" href="#_1-通过contentprovider进行传递"><span>1. 通过contentprovider进行传递</span></a></h3><h3 id="_2-通过" tabindex="-1"><a class="header-anchor" href="#_2-通过"><span>2. 通过</span></a></h3>`,23),l=[r];function p(c,t){return n(),e("div",null,l)}const m=a(i,[["render",p],["__file","xposed.html.vue"]]),u=JSON.parse('{"path":"/posts/xposed.html","title":"xposed摄像头hook教程","lang":"zh-CN","frontmatter":{"date":"2024-08-03T00:00:00.000Z","category":["xposed"],"tag":["Hook","Xposed"],"archive":true,"description":"xposed摄像头hook教程 主要有两点重点 拦截摄像头，将他的数据替换到一个virtual 的surface上面，主要是为了保活 获取播放摄像头数据的surface，然后将自己的内容投到这上面 1. 拦截摄像头 有3个摄像头的api接口可以被拦截，一个是camera1，camera2，以及camerax这个三个接口 1.1 拦截camera1 1....","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/wangyiheng-blog/posts/xposed.html"}],["meta",{"property":"og:site_name","content":"博客演示"}],["meta",{"property":"og:title","content":"xposed摄像头hook教程"}],["meta",{"property":"og:description","content":"xposed摄像头hook教程 主要有两点重点 拦截摄像头，将他的数据替换到一个virtual 的surface上面，主要是为了保活 获取播放摄像头数据的surface，然后将自己的内容投到这上面 1. 拦截摄像头 有3个摄像头的api接口可以被拦截，一个是camera1，camera2，以及camerax这个三个接口 1.1 拦截camera1 1...."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-08-11T09:34:52.000Z"}],["meta",{"property":"article:author","content":"DG"}],["meta",{"property":"article:tag","content":"Hook"}],["meta",{"property":"article:tag","content":"Xposed"}],["meta",{"property":"article:published_time","content":"2024-08-03T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-08-11T09:34:52.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"xposed摄像头hook教程\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-08-03T00:00:00.000Z\\",\\"dateModified\\":\\"2024-08-11T09:34:52.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"DG\\",\\"url\\":\\"https://mister-hope.com\\"}]}"]]},"headers":[{"level":2,"title":"1. 拦截摄像头","slug":"_1-拦截摄像头","link":"#_1-拦截摄像头","children":[{"level":3,"title":"1.1 拦截camera1","slug":"_1-1-拦截camera1","link":"#_1-1-拦截camera1","children":[]},{"level":3,"title":"1.2 拦截camera2","slug":"_1-2-拦截camera2","link":"#_1-2-拦截camera2","children":[]},{"level":3,"title":"1.3 拦截camerax","slug":"_1-3-拦截camerax","link":"#_1-3-拦截camerax","children":[]}]},{"level":2,"title":"2. 获取播放摄像头数据的surface","slug":"_2-获取播放摄像头数据的surface","link":"#_2-获取播放摄像头数据的surface","children":[]},{"level":2,"title":"3. 模块向宿主传递信息","slug":"_3-模块向宿主传递信息","link":"#_3-模块向宿主传递信息","children":[{"level":3,"title":"1. 通过contentprovider进行传递","slug":"_1-通过contentprovider进行传递","link":"#_1-通过contentprovider进行传递","children":[]},{"level":3,"title":"2. 通过","slug":"_2-通过","link":"#_2-通过","children":[]}]}],"git":{"createdTime":1722873134000,"updatedTime":1723368892000,"contributors":[{"name":"iiheng","email":"1269305589@qq.com","commits":2}]},"readingTime":{"minutes":2.12,"words":635},"filePathRelative":"posts/xposed.md","localizedDate":"2024年8月3日","excerpt":"\\n<blockquote>\\n<p>主要有两点重点</p>\\n<ol>\\n<li>拦截摄像头，将他的数据替换到一个virtual 的surface上面，主要是为了保活</li>\\n<li>获取播放摄像头数据的surface，然后将自己的内容投到这上面</li>\\n</ol>\\n</blockquote>\\n<h2>1. 拦截摄像头</h2>\\n<blockquote>\\n<p>有3个摄像头的api接口可以被拦截，一个是camera1，camera2，以及camerax这个三个接口</p>\\n</blockquote>\\n<h3>1.1 拦截camera1</h3>\\n<h3>1.2 拦截camera2</h3>\\n<h4>首先我们需要先了解正常Camera2调用的流程：</h4>","autoDesc":true}');export{m as comp,u as data};
