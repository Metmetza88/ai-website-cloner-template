"use client";

import { useState } from "react";
import { Clapperboard, Image as ImageIcon, Sparkles, Upload, Clock3, Settings2 } from "lucide-react";

type Mode = "video" | "image";
export default function Home() {
  const [mode, setMode] = useState<Mode>("video");
  const [prompt, setPrompt] = useState("");
  const [ratio, setRatio] = useState("16:9");
  const [resolution, setResolution] = useState("720p");
  const [duration, setDuration] = useState("5s");
  const [file, setFile] = useState<File | null>(null);
  const [notice, setNotice] = useState("");
  const ready = prompt.trim().length > 0;
  function prepare() {
    if (!ready) { setNotice("กรุณาใส่คำอธิบายภาพหรือวิดีโอก่อน"); return; }
    const draft = { type: mode, prompt: prompt.trim(), ratio, resolution, ...(mode === "video" ? { duration } : {}), referenceFile: file?.name ?? null };
    try {
      localStorage.setItem("studio-last-draft", JSON.stringify(draft));
      setNotice("บันทึกแบบร่างบนอุปกรณ์นี้แล้ว — ยังไม่ได้สร้างสื่อจริง ต้องเชื่อมต่อผู้ให้บริการ AI");
    } catch {
      setNotice("เตรียมแบบร่างแล้ว แต่เบราว์เซอร์ไม่อนุญาตให้บันทึกในเครื่อง");
    }
  }
  return (
    <main className="min-h-screen bg-[#090b13] text-slate-100">
      <header className="border-b border-white/10 bg-[#101321]/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
          <div className="flex items-center gap-3"><div className="rounded-xl bg-violet-600 p-2"><Sparkles size={23}/></div><div><strong className="text-lg tracking-wide">NOVA STUDIO</strong><p className="text-xs text-slate-400">AI Creative Workspace · Prototype</p></div></div>
          <span className="rounded-full border border-violet-400/30 px-3 py-1 text-xs text-violet-200">Preview</span>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-5 py-10">
        <div className="mb-9"><p className="mb-2 text-sm font-medium text-violet-300">CREATE SOMETHING NEW</p><h1 className="text-3xl font-bold tracking-tight sm:text-5xl">เปลี่ยนไอเดียเป็นภาพและวิดีโอ</h1><p className="mt-3 max-w-2xl text-slate-400">พื้นที่เตรียมพรอมป์ต์และตั้งค่างานสร้างสรรค์ ออกแบบใหม่โดยอ้างอิงรูปแบบการใช้งานของ AI generation studio</p></div>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(280px,1fr)]">
          <section className="rounded-3xl border border-white/10 bg-[#151929] p-5 shadow-2xl sm:p-7">
            <div className="mb-6 flex gap-2 rounded-xl bg-black/25 p-1">
              <button type="button" onClick={() => {setMode("video");setNotice("");}} aria-pressed={mode==="video"} className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-3 text-sm font-semibold transition ${mode==="video"?"bg-violet-600 text-white":"text-slate-400 hover:text-white"}`}><Clapperboard size={17}/> วิดีโอ AI</button>
              <button type="button" onClick={() => {setMode("image");setNotice("");}} aria-pressed={mode==="image"} className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-3 text-sm font-semibold transition ${mode==="image"?"bg-violet-600 text-white":"text-slate-400 hover:text-white"}`}><ImageIcon size={17}/> ภาพ AI</button>
            </div>
            <label htmlFor="prompt" className="mb-2 block text-sm font-semibold">Prompt</label>
            <textarea id="prompt" value={prompt} onChange={e=>setPrompt(e.target.value)} placeholder="บรรยายฉาก ตัวละคร แสง มุมกล้อง และบรรยากาศที่ต้องการ..." rows={6} className="w-full resize-y rounded-2xl border border-white/10 bg-[#0d1020] p-4 text-sm leading-7 text-white outline-none placeholder:text-slate-500 focus:border-violet-400"/>
            <div className="mt-4"><label htmlFor="reference" className="flex cursor-pointer items-center justify-center gap-3 rounded-2xl border border-dashed border-white/20 bg-[#101424] p-5 text-sm text-slate-300 hover:border-violet-400"><Upload size={19}/>{file ? file.name : "แนบภาพอ้างอิง (เลือกไฟล์)"}</label><input id="reference" type="file" accept="image/*" className="sr-only" onChange={e=>setFile(e.target.files?.[0]??null)}/>{file && <button type="button" className="mt-2 text-xs text-violet-300 underline" onClick={()=>setFile(null)}>ลบไฟล์ที่เลือก</button>}</div>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
              <label className="text-xs text-slate-400"><span className="mb-2 flex items-center gap-1"><Settings2 size={13}/> สัดส่วน</span><select value={ratio} onChange={e=>setRatio(e.target.value)} className="w-full rounded-xl border border-white/10 bg-[#0d1020] p-3 text-sm text-white"><option>16:9</option><option>9:16</option><option>1:1</option><option>4:3</option><option>3:4</option></select></label>
              <label className="text-xs text-slate-400"><span className="mb-2 block">ความละเอียด</span><select value={resolution} onChange={e=>setResolution(e.target.value)} className="w-full rounded-xl border border-white/10 bg-[#0d1020] p-3 text-sm text-white"><option>480p</option><option>720p</option><option>1080p</option></select></label>
              {mode==="video" && <label className="text-xs text-slate-400"><span className="mb-2 block">ความยาว</span><select value={duration} onChange={e=>setDuration(e.target.value)} className="w-full rounded-xl border border-white/10 bg-[#0d1020] p-3 text-sm text-white"><option>3s</option><option>5s</option><option>8s</option><option>10s</option><option>15s</option></select></label>}
            </div>
            <button type="button" onClick={prepare} className="mt-7 w-full rounded-xl bg-violet-600 px-5 py-4 font-semibold transition hover:bg-violet-500">บันทึกแบบร่าง {mode==="video"?"วิดีโอ":"ภาพ"}</button>
            {notice && <p role="status" className="mt-4 rounded-xl border border-violet-400/20 bg-violet-500/10 p-3 text-sm text-violet-200">{notice}</p>}
            <p className="mt-3 text-center text-xs text-slate-500">ต้นแบบ UI เท่านั้น · ยังไม่เชื่อม API สร้างภาพ/วิดีโอหรือระบบชำระเงิน</p>
          </section>
          <aside className="space-y-5">
            <section className="rounded-3xl border border-white/10 bg-[#151929] p-6"><div className="mb-4 flex items-center gap-2 text-lg font-semibold"><Clock3 size={19} className="text-violet-300"/> ประวัติการสร้าง</div><div className="flex min-h-40 flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 text-center"><Clapperboard className="mb-3 text-slate-600" size={30}/><p className="text-sm text-slate-400">ยังไม่มีผลงานที่สร้างจริง</p><p className="mt-1 text-xs text-slate-500">จะปรากฏเมื่อเชื่อมต่อ AI API</p></div></section>
            <section className="rounded-3xl border border-violet-400/15 bg-gradient-to-br from-violet-950/50 to-[#151929] p-6"><h2 className="font-semibold">เริ่มจากไอเดียเล็ก ๆ</h2><p className="mt-2 text-sm leading-6 text-slate-400">ลองเขียนพรอมป์ต์เกี่ยวกับฉากที่ต้องการ แล้วเลือกสัดส่วนสำหรับ YouTube หรือ TikTok</p><button type="button" className="mt-4 rounded-xl border border-violet-400/30 px-4 py-2 text-sm text-violet-200 hover:bg-violet-500/10" onClick={()=>{setPrompt("ภาพยนตร์สั้นบรรยากาศไทยยุค 1990 กล้องเคลื่อนช้า แสงอบอุ่น รายละเอียดสมจริง");setNotice("");}}>ใช้พรอมป์ต์ตัวอย่าง</button></section>
          </aside>
        </div>
      </div>
    </main>
  );
}
