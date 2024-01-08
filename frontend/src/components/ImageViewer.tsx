import Lightbox from "yet-another-react-lightbox";
import { Zoom } from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/styles.css";

type Props = {
  imageUrl: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ImageViewer({ imageUrl, open, setOpen }: Props) {
  return (
    <>
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={[
          {
            src: imageUrl,
          },
        ]}
        plugins={[Zoom]}
        zoom={{
          maxZoomPixelRatio: 4,
          wheelZoomDistanceFactor: 4,
        }}
        inline={{
          style: {
            width: "100%",
            maxWidth: "900px",
            aspectRatio: "3 / 2",
          },
        }}
      />
    </>
  );
}
