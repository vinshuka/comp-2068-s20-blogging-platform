import React from 'react';
import { Container } from 'react-bootstrap';

function About () {
    return (
        <Container className="my-5">
            <header class="jumbotron">
                <h1>All About Me</h1>
            </header>

            <div>
                <h4>The autobiography of Melissa Christie.</h4>
                <p>Hello, my name is Melissa Christie. I grew up in Midland, Ontario which is about an hour north of Barrie. Originally I was a fine artist, creating <a href="https://thevirtualinstructor.com/reliefprinting.html#:~:text=Relief%20printmaking%20is%20a%20form,to%20as%20%22block%20printing%22.">relief prints</a>. About two years ago I became interested in computer programming as another creative outlet, just like in art you can create something amazing from nothing. Because of that interest I've decided to move forward into a career as a programmer, so here I am in school again at age 30.</p>
            </div>
        </Container>

    );
}

export default About;