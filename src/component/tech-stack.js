import React, { useState, useEffect } from 'react';
import Tooltip from '@mui/material/Tooltip';

import './frame.css';
import Markdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'

const TooltipWrapper = ({ children, title }) => (
  <Tooltip title={title}>
    <span>{children}</span>
  </Tooltip>
);

const MarkdownRenderer = ({ markdown }) => (
<Markdown
    rehypePlugins={[rehypeRaw]}
    components={{
    tooltip: ({node, ...props}) => <TooltipWrapper {...props} />,
    }}
>
    {markdown}
</Markdown>
);

  
const TechStack = () => {

    const [markdown, setMarkdown] = useState(null);

    useEffect(() => {
        // Function to download the file
        const downloadFile = async () => {
          const url = 'https://raw.githubusercontent.com/nose2002kr/nose2002kr/master/README.md';
          try {
            const response = await fetch(url);
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.text();
            setMarkdown(data);
          } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
          }
        };
    
        downloadFile();
      }, []);

    return (
        <div>
        {markdown ? <MarkdownRenderer markdown={markdown} />: <p/>}
         
        </div>
    );
};

export default TechStack;