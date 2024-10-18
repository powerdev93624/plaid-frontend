import { Avatar, Flex, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import ChatBotImage from "@/assets/img/chat-bot.png";
import SystemBotImage from "@/assets/img/system-bot.svg";
import { marked } from 'marked';
import DOMPurify from 'dompurify';

const convertAndSanitizeMarkdown = (markdownText) => {
  // Convert markdown to HTML using Marked.js
  const html = marked(markdownText);
  // Sanitize the HTML using DOMPurify to prevent XSS attacks
  const sanitizedHtml = DOMPurify.sanitize(html);
  // Return the sanitized HTML to be rendered
  return sanitizedHtml;
};

const MarkdownRenderer = ({ markdownContent }) => {
  // Convert and sanitize markdown
  const sanitizedHtml = convertAndSanitizeMarkdown(markdownContent);
  return (
    // Use dangerouslySetInnerHTML in React to render sanitized HTML
    <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
  );
};

const ChatBox = ({ type, text, child }) => {
  const getAvatar = () => {
    switch (type) {
      case "ASSISTANT":
        return (
          <img
            src={ChatBotImage}
            width={40}
            height={40}
            style={{ borderRadius: 6 }}
          />
        );
      case "USER":
        return <Avatar size={40} shape="square" icon={<UserOutlined />} />;
      case "SYSTEM":
        return (
          <img
            src={SystemBotImage}
            width={24}
            height={24}
            style={{ borderRadius: 6 }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        padding: 20,
        backgroundColor: type === "BOT" ? "white" : "transparent",
        border: type === "SYSTEM"? "2px solid #00C65E" : "none"
      }}
    >
      <Flex gap={20}>
        {getAvatar()}
        <div>
          <Typography.Text>
            <MarkdownRenderer markdownContent={text} />
          </Typography.Text>
          {child ? <div style={{ marginTop: 10 }}>{child}</div> : null}
        </div>
      </Flex>
    </div>
  );
};

export default ChatBox;
