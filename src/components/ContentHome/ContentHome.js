import React from 'react';
import './styles.css';

export default function ContentHome() {
  return (
    <div className="content-container">
        <ul className="content-list">
            <li className="content-block">
                <h3 className="content-number">100</h3>
                <p className="content-description">Số câu hỏi</p>
            </li>
            <li className="content-block">
                <h3 className="content-number">100</h3>
                <p className="content-description">Số đề thi</p>
            </li>
            <li className="content-block">
                <h3 className="content-number">100</h3>
                <p className="content-description">Số lượt thi</p>
            </li>
        </ul>
    </div>
  );
}
