import React, { useState } from "react";
import { Card, Tag, Typography, Space, Avatar } from "antd";
import {
  CalendarOutlined,
  UserOutlined,
  GlobalOutlined,
  BorderOutlined,
  InfoCircleFilled,
  FlagOutlined,
  ReadOutlined,
  CaretDownOutlined,
  CaretUpOutlined,
  DownOutlined,
  UpOutlined,
} from "@ant-design/icons";
import "./NewsCard.scss";

const { Text, Title, Paragraph } = Typography;

interface IData_TagItem {
  value: string;
  count: number;
}

interface IData_TrafficItem {
  value: string;
  count: number;
}

interface IData_SnippetNews {
  ID: number;
  IT: string;
  AB: string;
  URL: string;
  DOM: string;
  DP: string;
  LANG: string;
  REACH: number;
  KM: IData_TagItem[];
  AU: string[];
  CNTR: string;
  CNTR_CODE: string;
  SENT: string;
  TRAFFIC: IData_TrafficItem[];
  FAV: string;
  HIGHLIGHTS: string[];
}

interface NewsCardProps {
  data: IData_SnippetNews;
  showDuplicates?: boolean;
}

const NewsCard: React.FC<NewsCardProps> = ({
  data,
  showDuplicates = false,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const [showHighlights, setShowHighlights] = useState(false);
  const [showDuplicatesSection, setShowDuplicatesSection] = useState(false);

  const toggleHighlights = () => {
    setShowHighlights(!showHighlights);
  };

  const toggleDuplicates = () => {
    setShowDuplicatesSection(!showDuplicatesSection);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  const getTopTrafficCountries = () => {
    if (!data.TRAFFIC || data.TRAFFIC.length === 0) return null;

    // общее количество трафика
    const total = data.TRAFFIC.reduce((sum, item) => sum + item.count, 0);

    const sorted = [...data.TRAFFIC].sort((a, b) => b.count - a.count);
    return sorted
      .slice(0, 2)
      .map((item) => {
        const percentage = (item.count / total) * 100;
        return `${item.value}-${percentage.toFixed(0)}%`;
      })
      .join(" ");
  };

  const formatText = (text: string) => {
    return text
      .replace(/<kw>/g, '<span class="highlight-word">')
      .replace(/<\/kw>/g, "</span>");
  };

  return (
    <Card className="news-card" hoverable>
      <div className="news-card-header">
        <div className="news-meta">
          <Space size="middle">
            <Text style={{ color: "var(--text-secondary)" }}>
              <CalendarOutlined /> {formatDate(data.DP)}
            </Text>

            <Text style={{ color: "var(--text-secondary)" }}>
              {formatNumber(data.REACH)} Reach
            </Text>
            {getTopTrafficCountries() && (
              <Text style={{ color: "var(--text-secondary)" }}>
                Top Traffic: {getTopTrafficCountries()}
              </Text>
            )}
            <div className="sentiment-tag">
              <Tag color="green" className="ant-tag">
                Positivo
              </Tag>
              <div className="ant-tag">
                <InfoCircleFilled />
              </div>
              <div className="ant-tag">
                <BorderOutlined />
                {""}
              </div>
            </div>
          </Space>
        </div>
      </div>

      <div className="news-content">
        <Title level={4} className="news-title">
          <a href={data.URL} target="_blank" rel="noopener noreferrer">
            {data.IT}
          </a>
        </Title>

        <div className="news-source">
          <Avatar size="small" src={data.FAV} icon={<GlobalOutlined />} />

          <Text
            strong
            className="news-domain"
            style={{ color: "#1890ff", textDecoration: "underline" }}
          >
            {data.DOM}
          </Text>
          <Text type="secondary" className="news-domain">
            <FlagOutlined /> {data.CNTR}
          </Text>
          <Text type="secondary" className="news-domain">
            <ReadOutlined /> {data.LANG}
          </Text>

          <Text type="secondary" style={{ color: "var(--text-secondary)" }}>
            <UserOutlined /> {data.AU.join(", ")}
          </Text>
        </div>

        <Paragraph ellipsis={{ rows: 3 }} className="news-abstract">
          {data.AB}
        </Paragraph>
        <button onClick={toggleHighlights} className="show-more-link">
          {" "}
          Show more
          {showHighlights ? (
            <CaretUpOutlined style={{ marginLeft: "5px" }} />
          ) : (
            <CaretDownOutlined style={{ marginLeft: "5px" }} />
          )}
        </button>

        {showHighlights && data.HIGHLIGHTS && data.HIGHLIGHTS.length > 0 && (
          <div className="news-highlights">
            <Paragraph ellipsis={{ rows: 4 }} className="highlight-text">
              ...
              <span
                dangerouslySetInnerHTML={{
                  __html: formatText(data.HIGHLIGHTS[0]),
                }}
              />
              ...
            </Paragraph>
          </div>
        )}

        <div className="news-tags">
          <Space size={[0, 8]} wrap>
            {data.KM.slice(0, 5).map((tag, index) => (
              <Tag key={index} className="news-tag">
                {tag.value}
              </Tag>
            ))}
            {data.KM.length > 5 && (
              <a href="#" className="show-all-tags">
                Show All
              </a>
            )}
          </Space>
        </div>
      </div>

      <div className="news-footer">
        <div className="duplicates-info">
          <Text type="secondary" style={{ color: "var(--text-secondary)" }}>
            Duplicates: 192
          </Text>
        </div>
        <button onClick={toggleDuplicates} className="view-duplicates">
          {showDuplicatesSection ? "Hide Duplicates" : "View Duplicates"}
          {showDuplicatesSection ? (
            <DownOutlined style={{ marginLeft: "10px" }} />
          ) : (
            <UpOutlined style={{ marginLeft: "10px" }} />
          )}
        </button>
      </div>

      {showDuplicatesSection && (
        <div
          style={{
            border: "2px solid #1e8af5",
            borderRadius: "10px",
            padding: "10px",
          }}
        >
          <div className="news-card-header">
            <div className="news-meta">
              <Space size="middle">
                <Text
                  type="secondary"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <CalendarOutlined /> {formatDate(data.DP)}
                </Text>

                <Text
                  style={{ color: "var(--text-secondary)" }}
                  type="secondary"
                >
                  {formatNumber(data.REACH)} Reach
                </Text>
                <div className="sentiment-tag">
                  <div className="ant-tag">
                    <InfoCircleFilled />
                  </div>
                  <div className="ant-tag">
                    <BorderOutlined />{" "}
                  </div>
                </div>
              </Space>
            </div>
          </div>

          <div className="news-content">
            <Title level={4} className="news-title">
              <a href={data.URL} target="_blank" rel="noopener noreferrer">
                {data.IT}
              </a>
            </Title>

            <div className="news-source">
              <Avatar size="small" src={data.FAV} icon={<GlobalOutlined />} />

              <Text
                strong
                className="news-domain"
                style={{ color: "#1890ff", textDecoration: "underline" }}
              >
                {data.DOM}
              </Text>
              <Text type="secondary" className="news-domain">
                <FlagOutlined /> {data.CNTR}
              </Text>
              <Text type="secondary" className="news-domain">
                <ReadOutlined /> {data.LANG}
              </Text>

              <Text type="secondary" style={{ color: "var(--text-secondary)" }}>
                <UserOutlined /> {data.AU.join(", ")}
              </Text>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default NewsCard;
