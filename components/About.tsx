import Link from 'next/link';
import { CloudLink, StaticPageContainer, TeamList } from './StaticPage.styles';
import { IconCloud } from './story/ChapterHeader.styles';

const About = () => {
  return (
    <StaticPageContainer>
      <Link href="/[[...story]]" as="/" passHref>
        <CloudLink>
          <IconCloud color="#fff" />
        </CloudLink>
      </Link>

      <section>
        <h2>Yours, Truly Co</h2>
        <p>
          Stories are our entryway to the world. Through them, as children, we discover new shapes
          and sounds and colours. Through them we encounter the strange, unfamiliar and downright
          bizarre. We are forced to expand our understanding of reality and sometimes conceive a
          different one altogether. It is this power in stories to shift us away from the familiar
          comforts of the known to the charged potential of the unknown that defines Trulyco.
        </p>
        <h3>Our Idea</h3>
        <p>
          We believe that every story is connected, and we have built our platform to highlight
          those connections; to demonstrate how one event could potentially have an impact on
          something else millions of miles or even years away. We explore these connections through
          prose, sound, videos and images.
        </p>
        <h3>But that’s not all we care about.</h3>
        <p>
          We care about driving deeper engagement with you and with the communities whose stories we
          tell. We want to bring people together around key ideas and important causes, and create
          awareness towards forms of action that are ethical, creative and sustainable.
        </p>
        <h3>How do we tell stories?</h3>
        <p>We explore a wide range of ideas through our topic-oriented brands:</p>
        <ol>
          <li>
            <div>
              <span style={{ borderRadius: '50%', borderColor: '#5B5FA8' }} />
            </div>
            <p>
              <span
                style={{
                  backgroundImage: 'linear-gradient(to right, #5b5fa8 3px, transparent 1px)',
                  backgroundSize: '4px 4px',
                }}
              >
                <b>TIMELINER</b>
              </span>
              : Policy. Polity. Politics.
            </p>
          </li>
          <li>
            <div>
              <img src="/icons/bloomer.svg" alt="bloomer" />
            </div>
            <p>
              <span
                style={{
                  backgroundImage: 'url(/images/underlines/bloomer-underline.png)',
                  backgroundSize: '6px 6px',
                }}
              >
                <b>BLOOMER</b>
              </span>
              : Health. Wellness. Food.
            </p>
          </li>
          <li>
            <div>
              <img src="/icons/beyonder.svg" alt="beyonder" />
            </div>
            <p>
              <span
                style={{
                  backgroundImage: 'url(/images/underlines/beyonder-underline.png)',
                  backgroundSize: '6px 6px',
                }}
              >
                <b>BEYONDER</b>
              </span>
              : Climate. Nature. Travel.
            </p>
          </li>
          <li>
            <div>
              <img src="/icons/outsider.svg" alt="outsider" />
            </div>
            <p>
              <span
                style={{
                  backgroundImage: 'url(/images/underlines/outsider-underline.png)',
                  backgroundSize: '5px 6px',
                }}
              >
                <b>OUTSIDER</b>
              </span>
              : Science. Industries. Tech.
            </p>
          </li>
          <li>
            <div>
              <span style={{ borderColor: '#E9475B' }} />
            </div>
            <p>
              <span
                style={{
                  backgroundImage:
                    'linear-gradient(to bottom,#E9475B 2px,transparent 2px,transparent 4px,#E9475B 4px,#E9475B)',
                  backgroundSize: '1px 6px',
                }}
              >
                <b>MAKER</b>
              </span>
              : Art. Culture. Design.
            </p>
          </li>
          <li>
            <div>
              <img src="/icons/original.svg" alt="original" />
            </div>
            <p>
              Through{' '}
              <span
                style={{
                  backgroundImage: 'url(/images/underlines/original-underline.png)',
                  backgroundSize: '16px 8px',
                }}
              >
                <b>ORIGINALS</b>
              </span>
              , we harness the power of moving images: documentaries, animations and short films.
            </p>
          </li>
        </ol>
        <h3>Your Role</h3>
        <p>Read. Donate. Share.</p>

        <br />
        <h3>Meet the Trulyco team</h3>
        <TeamList>
          <div>
            <img src="/images/team/adetomiwa.png" alt="Adetomiwa" />
            <p>Adetomiwa</p>
            <i>​Head of Product</i>
          </div>
          <div>
            <img src="/images/team/ibukunoluwa.png" alt="Ibukunoluwa" />
            <p>Ibukunoluwa</p>
            <i>
              ​Head of Business
              <br />
              Operations & Legal
            </i>
          </div>
          <div>
            <img src="/images/team/ikenna.png" alt="Ikenna" />
            <p>Ikenna</p>
            <i>​Executive Producer</i>
          </div>
          <div>
            <img src="/images/team/kemi.png" alt="Kemi" />
            <p>Kemi</p>
            <i>​Head of Story</i>
          </div>
          <div>
            <img src="/images/team/safiyyah.png" alt="Safiyyah" />
            <p>Safiyyah</p>
            <i>​Head of Performance</i>
          </div>
          <div>
            <img src="/images/team/somtochukwu.png" alt="Somtochukwu​" />
            <p>Somtochukwu​</p>
            <i>
              Head of Growth &<br />
              Strategy
            </i>
          </div>
          <div>
            <img src="/images/team/zainab.png" alt="Zainab" />
            <p>Zainab</p>
            <i>Creative Director</i>
          </div>
        </TeamList>

        <h3>Help us improve Trulyco</h3>
        <p>
          Notice anything funky? Contact us at{' '}
          <a href="mailto:​hey@bytruly.com">​hey@bytruly.com​</a>
        </p>
      </section>
    </StaticPageContainer>
  );
};

export default About;
