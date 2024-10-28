import React from 'react'
import Image from 'next/image'

const Header = () => {
  return (
    <header>
      <nav>
        <div>
          Sugar Paws
          <Image src={"/assets/favicon/sugar-paws-logo.png"} alt="Sugar Paws logo" width={20} height="20" style={{ width: "auto", height: "auto" }}></Image>
        </div>
      </nav>
    </header>
  )
}

export default Header