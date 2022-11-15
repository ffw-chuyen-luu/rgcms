import Navbar from './navbar'
import Footer from './footer'

export default function Layout({ children }) {
  return (
    <>
      <div id='MainContent'></div>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}
