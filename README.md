
# 🚀 ClaimNarrator AI

**ClaimNarrator AI** is a GenAI-powered assistant that transforms raw, unstructured insurance claim inputs into structured, emotion-aware, and insurance-ready narratives.

> 💡 Powered by **LLaMA** (Meta AI) via HuggingFace Inference API  
> 🎯 Built for the **GenAI Agent Hackathon – BFSI Innovation**

---

## 📌 Problem Statement

Insurance companies often receive claim requests that are:
- Poorly written or incomplete
- Voice notes without structure
- Lacking emotional tone

This leads to:
- Miscommunication
- Delayed claim processing
- Frustrated claimants and overworked agents

---

## ✅ Solution – ClaimNarrator AI

ClaimNarrator AI solves this problem by:
- Accepting raw user input (text or voice)
- Using a GenAI model to create a formal, structured summary
- Detecting emotional tone (pain, anger, fear, etc.)
- Suggesting the appropriate claim category (e.g., theft, accident, health)
- Generating a downloadable report (PDF/HTML)

---

## ⚙️ Tech Stack

| Component | Technology |
|----------|-------------|
| 🧠 GenAI Model | LLaMA (via HuggingFace API) |
| 🖥️ UI | Streamlit |
| 🔧 Backend | Python |
| 📝 Report Generation | fpdf (PDF), HTML (optional) |
| 🎙️ (Optional) Voice Input | SpeechRecognition |
| ☁️ Hosting | Streamlit Cloud / Replit |

---

## 🧠 How It Works

1. **User Input** (Text or Voice)
2. **GenAI Prompt 1**: Generates structured insurance claim narrative
3. **GenAI Prompt 2**: Extracts emotional tone + claim category
4. **Output**: Displays summary + PDF download

---

## 🧪 Sample Input & Output

### 🔹 Input:
```
I slipped in the office corridor on Wednesday around 11 AM. The floor was wet and there was no warning sign. I injured my ankle badly.
```

### 🔹 Output:
```
Summary:
On Wednesday at 11 AM, the claimant slipped in the office corridor due to a wet floor with no warning signs. This led to a significant ankle injury.

Emotion: Pain, Frustration  
Claim Type: Personal Accident – Workplace Injury
```

---

## 🗂️ Project Structure

```
ClaimNarratorAI/
│
├── app.py                     # Streamlit app
├── prompts.py                 # LLaMA prompt functions
├── utils/
│   ├── pdf_generator.py       # PDF generation utility
│   └── voice_input.py         # (Optional) Speech-to-text module
├── assets/                    # Images, logos, etc.
├── requirements.txt
└── README.md
```

---

## 📄 Installation & Setup

### 1. Clone the repo
```bash
git clone https://github.com/classadi/ClaimNarratorAI.git
cd ClaimNarratorAI
```

### 2. Install dependencies
```bash
pip install -r requirements.txt
```

### 3. Add your HuggingFace API key
Create a `.env` file:
```
HUGGINGFACE_API_KEY=your_key_here
```

### 4. Run the app
```bash
streamlit run app.py
```

---

## 🔮 Future Scope

- 🈳 Translate claim reports into Hindi / Marathi
- 🗣️ Enable WhatsApp or SMS-based filing
- 🔐 Add user authentication + database storage
- 📈 Real-time emotion analytics dashboard

---

## 🧠 Prompt Engineering Examples

### 🎯 Narrative Generation Prompt
```
Convert the following claim description into a structured, formal insurance summary with time, location, and clear grammar.
Input: {{user_input}}
```

### 🎯 Emotion & Tag Prompt
```
From the claim summary, extract:
1. Emotional tone (e.g., pain, sadness)
2. Probable claim category (e.g., medical, theft)
```

---

## 👤 Author

**Aditya Chaudhari**  
🎓 A.P. Shah Institute of Technology  
✉️ aditchaudhari1504@gmail.com  
🚀 GenAI & AI/ML Enthusiast  

---

## 📄 License

MIT License – Feel free to use, modify, or contribute!

---

> “Bringing Empathy to Insurance Claims with the Power of Open GenAI.” 💙
