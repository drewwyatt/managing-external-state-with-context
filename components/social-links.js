import React from 'react'
import styled from 'styled-components'

const Link = styled.a`
  text-decoration: none;
`

export const SocialLinks = () => (
  <p>
    <Link href="https://github.com/drewwyatt" target="_blank">
      @drewwyatt
    </Link>
    &nbsp;&nbsp;|&nbsp;&nbsp;
    <Link href="https://twitter.com/djwyatt" target="_blank">
      @djwyatt
    </Link>
  </p>
);