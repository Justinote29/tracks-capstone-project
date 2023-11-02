import Container from 'react-bootstrap/Container';
import Navbar from "react-bootstrap/Navbar"
import "../styles/tracksFooter.css";
import NavbarBrand from 'react-bootstrap/esm/NavbarBrand';

function TracksFooter() {
  return (
    // <div className="footer">
    //   <Navbar fixed="bottom">
    //     <div className="footerInfo">&copy; Tracks: Share Your Path</div>
    //   </Navbar>
    // </div>

        <Container className='footerContainer'>
          <Navbar fixed="ms bottom" className='footer'>
                <div className="footerContent">
                  <Navbar.Brand className="footerInfo1">6101 Highland Campus Dr, Austin, TX 78752 </Navbar.Brand>
                  <Navbar.Text className="justify-content-end footerInfo2">&copy; accTracks</Navbar.Text>
                </div>
      </Navbar>
        </Container>
  )
}

export default TracksFooter;