import React from 'react';
import './Footer.css';

function Footer () {
  return (
    <div className="footer_container">
      <footer className="footer">
        {/* <div className="logo-container"> */}
        {/* <a target="_blank" href="https://www.instagram.com/codeyourfuture_/">
                        <img className="logo"src="https://goldengatexpress.org/wp-content/uploads/2020/05/The_Instagram_Logo.jpg"></img>
                    </a>
                    <a target="_blank" href="https://www.facebook.com/codeyourfuture.io">
                        <img className="logo" src="https://i.pinimg.com/originals/41/b0/ed/41b0edd10bd1fcca1833c2e651fcfdaa.png"></img>
                    </a>
                   
                    <a target="_blank" href="https://twitter.com/CodeYourFuture">
                        <img className="logo" src="data:image/png;base64,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"></img>
                    </a>
                    <a target="_blank" href="https://github.com/codeyourfuture/">
                        <img className="logo" src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"></img>
                    </a>
                    <a target="_blank" href="https://codeyourfuture.io/">
                        <img className="logo" src="https://www.scottishrefugeecouncil.org.uk/wp-content/uploads/2019/10/Code-Your-Future.jpg"></img>
                    </a> */}
        {/* </div> */}
        <h5>
          CYF | West Midlands | Team QuestionMark 2020 | All rights reserved &reg;
        </h5>
      </footer>
    </div>
  );
}

export default Footer;
