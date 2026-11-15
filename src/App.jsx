import { useState, useRef, useEffect } from 'react'
import styled from '@emotion/styled'
import { Send, Settings, Moon, Sun, Trash2, Download, Menu } from 'lucide-react'
import './App.css'

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  background: ${props => props.theme === 'dark' ? '#1a1a1a' : '#f5f5f5'};
  color: ${props => props.theme === 'dark' ? '#e0e0e0' : '#333'};
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  transition: all 0.3s ease;
`

const Sidebar = styled.div`
  width: ${props => props.isOpen ? '280px' : '0'};
  background: ${props => props.theme === 'dark' ? '#2d2d2d' : '#fff'};
  border-right: 1px solid ${props => props.theme === 'dark' ? '#404040' : '#e0e0e0'};
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  overflow: hidden;
`

const SidebarHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid ${props => props.theme === 'dark' ? '#404040' : '#e0e0e0'};
  display: flex;
  align-items: center;
  gap: 10px;
`

const SidebarTitle = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
`

const ChatHistory = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px;
`

const HistoryItem = styled.div`
  padding: 12px;
  margin-bottom: 8px;
  border-radius: 8px;
  cursor: pointer;
  background: ${props => props.isActive ? (props.theme === 'dark' ? '#404040' : '#e8e8e8') : 'transparent'};

  &:hover {
    background: ${props => props.theme === 'dark' ? '#353535' : '#f0f0f0'};
  }
`

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid ${props => props.theme === 'dark' ? '#404040' : '#e0e0e0'};
  background: ${props => props.theme === 'dark' ? '#2d2d2d' : '#fff'};
`

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`

const HeaderRight = styled.div`
  display: flex;
  gap: 10px;
`

const IconButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme === 'dark' ? '#e0e0e0' : '#333'};
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${props => props.theme === 'dark' ? '#404040' : '#f0f0f0'};
  }
`

const ChatContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const Message = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 16px;
  border-radius: 12px;
  background: ${props => props.isUser
    ? (props.theme === 'dark' ? '#3a5a8c' : '#007aff')
    : (props.theme === 'dark' ? '#2d2d2d' : '#fff')};
  color: ${props => props.isUser ? '#fff' : (props.theme === 'dark' ? '#e0e0e0' : '#333')};
  max-width: 85%;
  align-self: ${props => props.isUser ? 'flex-end' : 'flex-start'};
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`

const Avatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${props => props.isUser
    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
  color: white;
  flex-shrink: 0;
`

const MessageContent = styled.div`
  flex: 1;
  word-wrap: break-word;
  line-height: 1.6;
`

const InputContainer = styled.div`
  padding: 20px;
  border-top: 1px solid ${props => props.theme === 'dark' ? '#404040' : '#e0e0e0'};
  background: ${props => props.theme === 'dark' ? '#2d2d2d' : '#fff'};
`

const InputWrapper = styled.div`
  display: flex;
  gap: 10px;
  max-width: 1200px;
  margin: 0 auto;
`

const Input = styled.textarea`
  flex: 1;
  padding: 14px 16px;
  border: 2px solid ${props => props.theme === 'dark' ? '#404040' : '#e0e0e0'};
  border-radius: 12px;
  background: ${props => props.theme === 'dark' ? '#1a1a1a' : '#f9f9f9'};
  color: ${props => props.theme === 'dark' ? '#e0e0e0' : '#333'};
  font-size: 15px;
  resize: none;
  font-family: inherit;
  min-height: 50px;
  max-height: 200px;

  &:focus {
    outline: none;
    border-color: #007aff;
  }

  &::placeholder {
    color: ${props => props.theme === 'dark' ? '#666' : '#999'};
  }
`

const SendButton = styled.button`
  background: linear-gradient(135deg, #007aff 0%, #0051d5 100%);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 14px 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 15px;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 122, 255, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`

const SettingsPanel = styled.div`
  position: fixed;
  top: 0;
  right: ${props => props.isOpen ? '0' : '-400px'};
  width: 400px;
  height: 100vh;
  background: ${props => props.theme === 'dark' ? '#2d2d2d' : '#fff'};
  box-shadow: -2px 0 10px rgba(0,0,0,0.1);
  transition: right 0.3s ease;
  padding: 20px;
  overflow-y: auto;
  z-index: 1000;
`

const SettingsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid ${props => props.theme === 'dark' ? '#404040' : '#e0e0e0'};
`

const SettingsTitle = styled.h2`
  margin: 0;
  font-size: 24px;
  font-weight: 600;
`

const SettingGroup = styled.div`
  margin-bottom: 30px;
`

const SettingLabel = styled.label`
  display: block;
  margin-bottom: 10px;
  font-weight: 500;
  font-size: 14px;
  color: ${props => props.theme === 'dark' ? '#b0b0b0' : '#666'};
`

const Slider = styled.input`
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: ${props => props.theme === 'dark' ? '#404040' : '#e0e0e0'};
  outline: none;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #007aff;
    cursor: pointer;
  }
`

const Select = styled.select`
  width: 100%;
  padding: 12px;
  border: 2px solid ${props => props.theme === 'dark' ? '#404040' : '#e0e0e0'};
  border-radius: 8px;
  background: ${props => props.theme === 'dark' ? '#1a1a1a' : '#f9f9f9'};
  color: ${props => props.theme === 'dark' ? '#e0e0e0' : '#333'};
  font-size: 14px;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #007aff;
  }
`

const ValueDisplay = styled.span`
  float: right;
  color: #007aff;
  font-weight: 600;
`

function App() {
  const [theme, setTheme] = useState('dark')
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Привет! Я Claude. Как я могу помочь вам сегодня?',
      isUser: false,
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [settings, setSettings] = useState({
    temperature: 0.7,
    maxTokens: 2000,
    model: 'claude-sonnet-4',
    language: 'ru'
  })
  const chatEndRef = useRef(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage = {
      id: Date.now(),
      text: input,
      isUser: true,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')

    // Симуляция ответа Claude (здесь будет интеграция с CLI)
    setTimeout(() => {
      const assistantMessage = {
        id: Date.now() + 1,
        text: `Вы написали: "${input}". Это демо интерфейс. Интеграция с Claude Code CLI будет добавлена.`,
        isUser: false,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, assistantMessage])
    }, 1000)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const clearChat = () => {
    setMessages([{
      id: 1,
      text: 'Чат очищен. Чем могу помочь?',
      isUser: false,
      timestamp: new Date()
    }])
  }

  const exportChat = () => {
    const chatText = messages.map(m =>
      `[${m.timestamp.toLocaleString()}] ${m.isUser ? 'Вы' : 'Claude'}: ${m.text}`
    ).join('\n\n')

    const blob = new Blob([chatText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `claude-chat-${Date.now()}.txt`
    a.click()
  }

  return (
    <AppContainer theme={theme}>
      <Sidebar isOpen={sidebarOpen} theme={theme}>
        <SidebarHeader theme={theme}>
          <SidebarTitle>История</SidebarTitle>
        </SidebarHeader>
        <ChatHistory>
          <HistoryItem theme={theme} isActive={true}>
            Текущий чат
          </HistoryItem>
        </ChatHistory>
      </Sidebar>

      <MainContent>
        <Header theme={theme}>
          <HeaderLeft>
            <IconButton theme={theme} onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu size={20} />
            </IconButton>
            <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 600 }}>
              Claude Web Interface
            </h1>
          </HeaderLeft>
          <HeaderRight>
            <IconButton theme={theme} onClick={clearChat} title="Очистить чат">
              <Trash2 size={20} />
            </IconButton>
            <IconButton theme={theme} onClick={exportChat} title="Экспортировать">
              <Download size={20} />
            </IconButton>
            <IconButton theme={theme} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </IconButton>
            <IconButton theme={theme} onClick={() => setSettingsOpen(!settingsOpen)}>
              <Settings size={20} />
            </IconButton>
          </HeaderRight>
        </Header>

        <ChatContainer>
          {messages.map(message => (
            <Message key={message.id} isUser={message.isUser} theme={theme}>
              <Avatar isUser={message.isUser}>
                {message.isUser ? 'Я' : 'C'}
              </Avatar>
              <MessageContent>{message.text}</MessageContent>
            </Message>
          ))}
          <div ref={chatEndRef} />
        </ChatContainer>

        <InputContainer theme={theme}>
          <InputWrapper>
            <Input
              theme={theme}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Напишите сообщение Claude..."
              rows={1}
            />
            <SendButton onClick={handleSend} disabled={!input.trim()}>
              <Send size={18} />
              Отправить
            </SendButton>
          </InputWrapper>
        </InputContainer>
      </MainContent>

      <SettingsPanel isOpen={settingsOpen} theme={theme}>
        <SettingsHeader theme={theme}>
          <SettingsTitle>Настройки</SettingsTitle>
          <IconButton theme={theme} onClick={() => setSettingsOpen(false)}>
            ✕
          </IconButton>
        </SettingsHeader>

        <SettingGroup>
          <SettingLabel theme={theme}>
            Модель Claude
          </SettingLabel>
          <Select
            theme={theme}
            value={settings.model}
            onChange={(e) => setSettings({...settings, model: e.target.value})}
          >
            <option value="claude-opus-4">Claude Opus 4.6</option>
            <option value="claude-sonnet-4">Claude Sonnet 4.6</option>
            <option value="claude-haiku-4">Claude Haiku 4.5</option>
          </Select>
        </SettingGroup>

        <SettingGroup>
          <SettingLabel theme={theme}>
            Температура
            <ValueDisplay>{settings.temperature}</ValueDisplay>
          </SettingLabel>
          <Slider
            theme={theme}
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={settings.temperature}
            onChange={(e) => setSettings({...settings, temperature: parseFloat(e.target.value)})}
          />
        </SettingGroup>

        <SettingGroup>
          <SettingLabel theme={theme}>
            Максимум токенов
            <ValueDisplay>{settings.maxTokens}</ValueDisplay>
          </SettingLabel>
          <Slider
            theme={theme}
            type="range"
            min="500"
            max="4000"
            step="100"
            value={settings.maxTokens}
            onChange={(e) => setSettings({...settings, maxTokens: parseInt(e.target.value)})}
          />
        </SettingGroup>

        <SettingGroup>
          <SettingLabel theme={theme}>
            Язык интерфейса
          </SettingLabel>
          <Select
            theme={theme}
            value={settings.language}
            onChange={(e) => setSettings({...settings, language: e.target.value})}
          >
            <option value="ru">Русский</option>
            <option value="en">English</option>
          </Select>
        </SettingGroup>
      </SettingsPanel>
    </AppContainer>
  )
}

export default App
