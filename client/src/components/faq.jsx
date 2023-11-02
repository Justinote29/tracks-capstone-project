import Card from "react-bootstrap/Card";
import "../styles/faqs.css";

const FaqPage = () => {
  return (
    <div className="pageDiv">
      <img className="faqLogo" src="/Tracks_University_01.png" alt="" />

      <Card className="faqsCard">
        <h2 className="faq">FAQs</h2>
        <h4 className="faq">What is Tracks?</h4>
        <h5>
          Tracks is a place to leave your thoughts, memories or any other
          connection you have with a physical space and share in the experiences
          of others who have walked there before.
        </h5>
        <h4 className="faq">Where did the idea for Tracks come from?</h4>
        <h5>
          The idea originated after reading the book, An Immense World, by Ed
          Yong. We were fascinated by the idea that animals such as elephants
          and dogs have access to the recent history of every physical space
          they walk through thanks to their sense of smell. As we walk through
          the world, we leave traces that are almost entirely invisible to our
          species. Tracks is an attempt to allow us to leave traces of ourselves
          in a way that is accessible to others.
        </h5>
        <h4 className="faq">Can I create a track from anywhere?</h4>
        <h5>
          Yes, you can create a track from anywhere, but the track is created
          and tied to the place where it is created. We feel it is important for
          the track to be created in the physical space it's connected to.
        </h5>
        <h4></h4>
      </Card>
    </div>
  );
};

export default FaqPage;
