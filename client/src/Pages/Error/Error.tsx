import Lottie from "lottie-react";
import ErrorAnimation from "../../assets/animations/Error-Animation.json";

export function ErrorPage() {
  return (
    <div className="wrapper">
      <Lottie
        animationData={ErrorAnimation}
        loop
        autoplay
        style={{ width: "100%", height: "55vh" }}
      />
    </div>
  );
}
