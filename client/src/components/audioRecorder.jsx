import { useReactMediaRecorder } from "react-media-recorder";
import Button from "react-bootstrap/Button";
import { useEffect } from "react";
import RecordRTC, { invokeSaveAsDialog } from "recordrtc";

//Using React-Media-Recorder to make a simple audio recorder, RecordRTC is another options that has a lot of demo and good documentation.   Bring in updateAudio from props and then pass it the mediaBlobUrl to send it to the parent component (createTrack)
const AudioRecorder = (props) => {
  const { updateAudioUrl } = props;
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({
      audio: true,
      blobPropertyBag: {
        type: "audio/mp4",
      },
    });
  // useEffect(() => {
  //   updateAudioUrl(mediaBlobUrl);
  // }, [mediaBloblUrl]);
  updateAudioUrl(mediaBlobUrl);

  return (
    <div>
      <div>
        <Button className="startButton" onClick={startRecording} variant="info">
          Record
        </Button>

        <Button className="stopButton" onClick={stopRecording} variant="danger">
          Stop
        </Button>
      </div>
      <h5>Recording Status:{status}</h5>

      <div>
        <audio src={mediaBlobUrl} controls />
      </div>
    </div>
  );
};

export default AudioRecorder;
