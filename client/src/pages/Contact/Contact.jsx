import React, { Component } from 'react';

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
        <div className="contact-right">
        
        <h3>Your opinion is important to us</h3>
        <p>Whether a compliment or a complaint, we would like to know your feedback, so please feel free to contact us. Our office opening hours are 9-5 Monday to Friday so please bear in mind that any emails sent after 5pm on a Friday won't be seen until Monday morning.</p>
        <p>
            You can reach us at <strong>0321-1234567</strong> or email us at <a href="mailto:thebagelshoppk@gmail.com">thebagelshoppk@gmail.com</a><br></br> <br></br> Have a good day!
        </p>
        
            </div>
         );
    }
}
 
export default Contact;
