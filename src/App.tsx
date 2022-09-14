import { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";

// components
import { ImageDropzone, Button } from "./components";

// styles
import styles from './App.module.scss';

const cx = classNames.bind(styles);

function App() {
  const [image, setImage] = useState(null);
  const [canvasContext, setCanvasContext] = useState<CanvasRenderingContext2D | null>(null);
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const downloadLinkRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const w = 400;
      const h = 400;
      canvasRef.current.width = w;
      canvasRef.current.height = h;
      const ctx = canvasRef.current.getContext("2d");
      setCanvasContext(ctx);
    }
  }, [])

  useEffect(() => {
    if (image && canvasContext) {
      setLoading(true);
      const img = new Image();
      img.src = image;
      const w = canvasContext.canvas.width;
      const h = canvasContext.canvas.height;
      img.onload = () => {
        canvasContext.clearRect(0, 0, w, h);
        const img_w = img.width;
        const img_h = img.height;
        canvasContext.drawImage(img, (img_w-img_h)/2, 0, img_h, img_h, 0, 0, w, h);

        if (downloadLinkRef.current) {
          downloadLinkRef.current.download = "cropped_twitter_image.png";
          downloadLinkRef.current.href = canvasRef.current?.toDataURL() || "#";
        }

        setLoading(false);
      }
    }
  }, [image])

  return <main className={cx("main-layout")}>
    <ImageDropzone setValue={setImage} wrapperClass={cx("image-dropzone")}/>
    <canvas ref={canvasRef} className={cx("canvas")}></canvas>
    <a ref={downloadLinkRef} className={cx("download-link", {loading})}>
      <Button label={loading ? "Loading..." : "Download"}/>
    </a>
    </main>
}

export default App
