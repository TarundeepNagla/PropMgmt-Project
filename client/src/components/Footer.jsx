import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble } from 'react-icons/bs';
export default function FooterCom() {
  return(
    <Footer container className='border border-t-8 border-teal-500'>
        <div className='w-full max-w-7xl mx-auto'>
            <div className='grid'> 
                <div className='mt-5'>
                <Link to='/'className='self-center whitespace-nowrap text-lg 
                sm:text-xl font-semibold dark:text-white' color='blue'>
                    <span className='px-2 py-1 self-center'>
                    Property
                    </span>
                    Management
                </Link>
                </div>
                <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
                    <div >
                    <Footer.Title title='About' />
                    <Footer.LinkGroup col>
                        {/* to open in new TAB */}
                        <Footer.Link href='/' target='_blank' rel='noopener norefereer'> 
                            Property Management
                        </Footer.Link>
                    </Footer.LinkGroup>
                    </div>
                    <div>
                    <Footer.Title title="Follow us" />
                    <Footer.LinkGroup col>
                        <Footer.Link href="#">Github</Footer.Link>
                        <Footer.Link href="#">Discord</Footer.Link>
                    </Footer.LinkGroup>
                    </div>
                </div>
                <Footer.Divider />
                <div className="w-full sm:flex sm:items-center sm:justify-between">
                <Footer.Copyright href="/" by="Property Managemt" year={new Date().getFullYear()} />
                <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
                    <Footer.Icon href="#" icon={BsFacebook} />
                    <Footer.Icon href="#" icon={BsInstagram} />
                    <Footer.Icon href="#" icon={BsTwitter} />
                </div>
                </div>
            </div>
        </div>
    </Footer>
  );
  };