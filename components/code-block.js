import React from 'react'
import {UnControlled as CodeMirror} from 'react-codemirror2'
require('codemirror/mode/javascript/javascript');

export const CodeBlock = ({children, options = {}, style, ...props}) => (
  <div style={{fontSize: 18, overflow: 'scroll', ...style}}>
    <CodeMirror
      value={children}
      options={{
        mode: {name: "jsx", base: {name: "javascript", typescript: true}},
        theme: 'monokai',
        lineNumbers: false,
        readOnly: 'nocursor',
        ...options,
      }}
      {...props}
    />
  </div>
)
