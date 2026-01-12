import { useState, useCallback } from 'react';
import { StreamText } from './components/StreamText';
import './App.css';

const DEMO_TEXT = `这里是我们测试用的流式打字机效果演示，光标会丝滑地跟随文字移动。患者自3天前出现喘不上来气的症状，每次发作持续约半小时，开窗通风后症状可缓解。患者描述发作时伴有胸闷及胸痛，胸痛表现为一大口吸气时胸口正中钝痛。患者否认咳嗽症状，无明确诱因及其他伴随症状。症状表现为躺下时加重。
`


const CURSOR_COLORS = [
  { name: '紫粉渐变', value: '#a855f7' },
  { name: '天蓝', value: '#3b82f6' },
  { name: '翠绿', value: '#10b981' },
  { name: '玫瑰红', value: '#f43f5e' },
  { name: '琥珀金', value: '#f59e0b' },
];

function App() {
  const [key, setKey] = useState(0);
  const [cursorColor, setCursorColor] = useState('#a855f7');
  const [speed, setSpeed] = useState(200);
  const [isPlaying, setIsPlaying] = useState(true);

  const handleReplay = useCallback(() => {
    setKey((previousKey) => previousKey + 1);
    setIsPlaying(true);
  }, []);

  const handleComplete = useCallback(() => {
    setIsPlaying(false);
  }, []);

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">
          <span className="title-icon">⌨️</span>
          流式打字机效果
        </h1>
        <p className="subtitle">Stream Typewriter Effect Demo</p>
      </header>

      <main className="main">
        <div className="demo-container">
          <div className="demo-content">
            <StreamText
              key={key}
              text={DEMO_TEXT}
              speed={speed}
              cursorColor={cursorColor}
              onComplete={handleComplete}
            />
          </div>
        </div>

        <div className="controls">
          <div className="control-section">
            <label className="control-label">光标颜色</label>
            <div className="color-options">
              {CURSOR_COLORS.map((color) => (
                <button
                  key={color.value}
                  className={`color-btn ${cursorColor === color.value ? 'active' : ''}`}
                  style={{ backgroundColor: color.value }}
                  onClick={() => setCursorColor(color.value)}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          <div className="control-section">
            <label className="control-label">
              打字速度: {speed}ms
            </label>
            <input
              type="range"
              min="30"
              max="200"
              value={speed}
              onChange={(event) => setSpeed(Number(event.target.value))}
              className="speed-slider"
            />
          </div>

          <button
            className="replay-btn"
            onClick={handleReplay}
            disabled={isPlaying}
          >
            <span className="replay-icon">🔄</span>
            重新播放
          </button>
        </div>
      </main>

      <footer className="footer">
        <p>Built with Vite + React + TypeScript</p>
      </footer>
    </div>
  );
}

export default App;
