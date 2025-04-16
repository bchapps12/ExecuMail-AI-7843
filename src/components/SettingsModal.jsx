import React from 'react';
import { motion } from 'framer-motion';
import { 
  IoCloseOutline, 
  IoKeyOutline, 
  IoBookmarkOutline, // Changed from IoLabelOutline
  IoSpeedometerOutline 
} from 'react-icons/io5';

const SettingsModal = ({ onClose, settings, onSave }) => {
  const [localSettings, setLocalSettings] = React.useState(settings);

  const handleSave = () => {
    onSave(localSettings);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Settings</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <IoCloseOutline className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4 space-y-6">
          {/* Gmail Labels */}
          <section className="space-y-2">
            <h3 className="text-lg font-medium flex items-center">
              <IoBookmarkOutline className="mr-2" />
              Gmail Labels
            </h3>
            <div className="space-y-2">
              {localSettings.labels.map(label => (
                <label key={label.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={label.selected}
                    onChange={(e) => {
                      setLocalSettings(prev => ({
                        ...prev,
                        labels: prev.labels.map(l =>
                          l.id === label.id ? { ...l, selected: e.target.checked } : l
                        )
                      }));
                    }}
                    className="rounded text-primary-500"
                  />
                  <span>{label.name}</span>
                </label>
              ))}
            </div>
          </section>

          {/* API Keys */}
          <section className="space-y-2">
            <h3 className="text-lg font-medium flex items-center">
              <IoKeyOutline className="mr-2" />
              API Keys
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">OpenAI API Key</label>
                <input
                  type="password"
                  value={localSettings.openaiKey}
                  onChange={(e) => setLocalSettings(prev => ({ ...prev, openaiKey: e.target.value }))}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">ElevenLabs API Key</label>
                <input
                  type="password"
                  value={localSettings.elevenLabsKey}
                  onChange={(e) => setLocalSettings(prev => ({ ...prev, elevenLabsKey: e.target.value }))}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
            </div>
          </section>

          {/* Voice Settings */}
          <section className="space-y-2">
            <h3 className="text-lg font-medium flex items-center">
              <IoSpeedometerOutline className="mr-2" />
              Voice Settings
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">Voice Selection</label>
                <select
                  value={localSettings.voice}
                  onChange={(e) => setLocalSettings(prev => ({ ...prev, voice: e.target.value }))}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="adam">Adam</option>
                  <option value="bella">Bella</option>
                  <option value="charlie">Charlie</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Speech Speed</label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={localSettings.speed}
                  onChange={(e) => setLocalSettings(prev => ({ ...prev, speed: e.target.value }))}
                  className="w-full"
                />
                <div className="text-sm text-gray-500 text-center">{localSettings.speed}x</div>
              </div>
            </div>
          </section>

          {/* AI Prompts */}
          <section className="space-y-2">
            <h3 className="text-lg font-medium">AI Prompts</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">Summary Generation</label>
                <textarea
                  value={localSettings.summaryPrompt}
                  onChange={(e) => setLocalSettings(prev => ({ ...prev, summaryPrompt: e.target.value }))}
                  className="w-full p-2 border rounded-lg h-24"
                  placeholder="Prompt for generating email summaries..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Reply Generation</label>
                <textarea
                  value={localSettings.replyPrompt}
                  onChange={(e) => setLocalSettings(prev => ({ ...prev, replyPrompt: e.target.value }))}
                  className="w-full p-2 border rounded-lg h-24"
                  placeholder="Prompt for generating email replies..."
                />
              </div>
            </div>
          </section>
        </div>

        <div className="p-4 border-t">
          <button
            onClick={handleSave}
            className="w-full bg-primary-500 text-white py-2 rounded-lg hover:bg-primary-600 transition-colors"
          >
            Save Settings
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SettingsModal;