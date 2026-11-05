import { setConfiguredMessages } from "./messages.js";

let currentSettings;

export const setSettings = (settings) => {
  currentSettings = settings;
  setConfiguredMessages(settings.messages);
};

export const getSettings = () => {
  if (!currentSettings) {
    throw new Error("As configurações do bot ainda não foram carregadas.");
  }
  return currentSettings;
};
