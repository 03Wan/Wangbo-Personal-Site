"use client";

import { useEffect, useState } from "react";
import styles from "./friendship.module.css";

type Screen = "home" | "analyze" | "result";

const relations = ["好朋友", "同学", "饭搭子", "姐妹", "暧昧对象", "神秘关系"];

const toastMessages = [
  "关系修复申请已提交 😎",
  "50元精神到账成功",
  "系统：友情闭环进度 +99%",
  "检测到强烈的鸡腿需求",
  "别点了，真的不会扣钱",
];

export default function FriendshipPage() {
  const [screen, setScreen] = useState<Screen>("home");
  const [me, setMe] = useState("");
  const [friend, setFriend] = useState("王波");
  const [relation, setRelation] = useState("好朋友");
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("正在建立双人关系模型…");
  const [doneStep, setDoneStep] = useState(0);
  const [toast, setToast] = useState("");
  const [particles, setParticles] = useState<Array<{ id: number; icon: string; x: number; y: number; dx: number; dy: number; r: number }>>([]);

  const meName = me.trim() || "你";
  const friendName = friend.trim() || "王波";

  useEffect(() => {
    document.title = "年度好友亲密度测试";
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 1600);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const startTest = () => {
    setScreen("analyze");
    setProgress(0);
    setDoneStep(0);
    setStatus("正在建立双人关系模型…");

    const steps = [
      [18, "正在建立双人关系模型…", 0],
      [39, "正在测算聊天默契…", 1],
      [58, "正在匹配回复节奏…", 2],
      [76, "正在提取共同记忆特征…", 3],
      [91, "正在检查潜在关系风险…", 4],
      [100, "报告生成完成。", 4],
    ] as const;

    steps.forEach(([value, text, done], index) => {
      window.setTimeout(() => {
        setProgress(value);
        setStatus(text);
        setDoneStep(done);

        if (value === 100) {
          window.setTimeout(() => {
            setScreen("result");
            burst(window.innerWidth / 2, 150, ["💚", "✨", "🤝", "99.8%"]);
            if (navigator.vibrate) navigator.vibrate([30, 30, 45]);
          }, 420);
        }
      }, index * 560);
    });
  };

  const burst = (x: number, y: number, icons = ["🍗", "💸", "💚", "50", "✨", "🤝", "😂"]) => {
    const now = Date.now();
    const next = Array.from({ length: 26 }, (_, i) => ({
      id: now + i,
      icon: icons[Math.floor(Math.random() * icons.length)],
      x,
      y,
      dx: Math.random() * 300 - 150,
      dy: -90 - Math.random() * 320,
      r: Math.random() * 720 - 360,
    }));
    setParticles(next);
    window.setTimeout(() => setParticles([]), 1400);
  };

  const handleV50 = (event: React.MouseEvent<HTMLButtonElement>) => {
    burst(event.clientX || window.innerWidth / 2, event.clientY || window.innerHeight * 0.75);
    if (navigator.vibrate) navigator.vibrate([40, 30, 50]);
    setToast(toastMessages[Math.floor(Math.random() * toastMessages.length)]);
  };

  const copyResult = async () => {
    const text = `${meName} 与 ${friendName} 的年度好友亲密度\n亲密度：99.8%\n关系评价：${relation === "暧昧对象" ? "高危默契 · 建议继续观察" : "极高默契 · 稀有关系"}\n当前唯一风险：${meName} 尚未 V ${friendName} 50\n\n——年度好友亲密度测试（纯娱乐）`;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setToast("已复制，去测试你们的友情");
  };

  const initial = (name: string, fallback: string) => (name.trim() ? name.trim().slice(0, 1) : fallback);

  return (
    <main className={styles.page}>
      {screen === "home" && (
        <section className={styles.screen}>
          <div className={styles.wrap}>
            <div className={styles.top}>
              <div className={styles.appIcon}>♡</div>
              <h1>年度好友亲密度测试</h1>
              <p>输入双方名字，生成一份今年的好友默契报告</p>
            </div>

            <div className={styles.card}>
              <div className={styles.field}>
                <label htmlFor="me">你的名字</label>
                <input id="me" value={me} onChange={(e) => setMe(e.target.value)} placeholder="例如：姚闻月" maxLength={12} />
              </div>

              <div className={styles.field}>
                <label htmlFor="friend">TA 的名字</label>
                <input id="friend" value={friend} onChange={(e) => setFriend(e.target.value)} placeholder="例如：王波" maxLength={12} />
              </div>

              <div className={styles.field}>
                <label>你们是什么关系？</label>
                <div className={styles.chips}>
                  {relations.map((item) => (
                    <button
                      key={item}
                      type="button"
                      className={`${styles.chip} ${relation === item ? styles.chipActive : ""}`}
                      onClick={() => setRelation(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <button type="button" className={styles.mainButton} onClick={startTest}>开始生成报告</button>
              <div className={styles.privacy}>🔒 纯娱乐 · 所有输入仅在本机处理 · 不上传服务器</div>
            </div>
          </div>
        </section>
      )}

      {screen === "analyze" && (
        <section className={styles.screen}>
          <div className={styles.wrap}>
            <div className={styles.card}>
              <div className={styles.smallTag}><span className={styles.dot} />正在计算</div>
              <div className={styles.analysisTitle}>分析你们的关系信号</div>
              <div className={styles.muted}>{status}</div>
              <div className={styles.progress}><div className={styles.bar} style={{ width: `${progress}%` }} /></div>
              <div className={styles.scanList}>
                {[
                  ["聊天默契", "优秀"],
                  ["回复节奏", "高度同步"],
                  ["共同记忆", "强关联"],
                  ["周四风险因子", "发现 1 项"],
                ].map(([label, result], index) => (
                  <div className={styles.scan} key={label}>
                    <span>{label}</span>
                    <span className={index < doneStep ? styles.done : ""}>
                      {index < doneStep ? result : index === doneStep ? "分析中" : "等待"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {screen === "result" && (
        <section className={styles.screen}>
          <div className={styles.wrap}>
            <div className={`${styles.card} ${styles.result}`}>
              <div className={styles.avatarRow}>
                <div className={styles.avatar}>{initial(meName, "你")}</div>
                <div className={styles.heart}>💚</div>
                <div className={`${styles.avatar} ${styles.avatarSecond}`}>{initial(friendName, "王")}</div>
              </div>

              <div className={styles.pair}>{meName} 与 {friendName} 的年度好友亲密度</div>
              <div className={styles.score}>99.8<small>%</small></div>
              <div className={styles.level}>{relation === "暧昧对象" ? "高危默契 · 建议继续观察" : "极高默契 · 稀有关系"}</div>

              <div className={styles.metrics}>
                {[
                  ["聊天默契", 99],
                  ["情绪接收能力", 98],
                  ["长期好友潜力", 100],
                ].map(([label, value]) => (
                  <div className={styles.metric} key={label}>
                    <div className={styles.metricHead}><span>{label}</span><b>{value}%</b></div>
                    <div className={styles.meter}><i style={{ width: `${value}%` }} /></div>
                  </div>
                ))}
              </div>

              <div className={styles.risk}>
                <div className={styles.riskTop}>⚠ 唯一风险项</div>
                <div className={styles.riskText}>当前唯一风险：{meName} 尚未 V {friendName} 50</div>
                <div className={styles.riskSub}>系统判断：完成一次 50 元级别的周四友情支持后，关系闭环概率将显著提升。</div>
              </div>

              <div className={styles.actions}>
                <button type="button" className={styles.v50} onClick={handleV50}>🍗 修复关系风险：V我50</button>
                <button type="button" className={`${styles.subButton} ${styles.ghost}`} onClick={() => setScreen("home")}>重新测试</button>
                <button type="button" className={`${styles.subButton} ${styles.green}`} onClick={copyResult}>复制结果</button>
              </div>

              <div className={styles.footerNote}>本测试纯属娱乐，与任何社交平台无关，也不会读取真实聊天记录。</div>
            </div>
          </div>
        </section>
      )}

      {particles.map((p) => (
        <span
          key={p.id}
          className={styles.particle}
          style={{
            left: p.x,
            top: p.y,
            "--dx": `${p.dx}px`,
            "--dy": `${p.dy}px`,
            "--rot": `${p.r}deg`,
          } as React.CSSProperties}
        >
          {p.icon}
        </span>
      ))}

      {toast && <div className={styles.toast}>{toast}</div>}
    </main>
  );
}
