import { DiscussionEmbed } from 'disqus-react';
import './DisqusSection.css';

const DISQUS_SHORTNAME = 'vacation-4';
const PAGE_URL = 'https://hmdad.uk';
const PAGE_IDENTIFIER = 'vacation-planner-v1';
const PAGE_TITLE = '방학 생활계획표 짜기';

export function DisqusSection() {
  return (
    <section className="disqus-section">
      <h2 className="disqus-heading">💬 댓글</h2>
      <div className="disqus-embed-wrapper">
        <DiscussionEmbed
          shortname={DISQUS_SHORTNAME}
          config={{
            url: PAGE_URL,
            identifier: PAGE_IDENTIFIER,
            title: PAGE_TITLE,
            language: 'ko_KR',
          }}
        />
      </div>
    </section>
  );
}
