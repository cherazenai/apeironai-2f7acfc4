import { createContext, useContext, useState, ReactNode, useCallback } from "react";

interface GuestModeContextType {
  isGuest: boolean;
  actionsUsed: number;
  maxFreeActions: number;
  shouldShowSignupModal: boolean;
  setShouldShowSignupModal: (v: boolean) => void;
  trackAction: () => boolean; // returns true if action is allowed
}

const GuestModeContext = createContext<GuestModeContextType>({
  isGuest: false,
  actionsUsed: 0,
  maxFreeActions: 3,
  shouldShowSignupModal: false,
  setShouldShowSignupModal: () => {},
  trackAction: () => true,
});

export const GuestModeProvider = ({ children, isGuest }: { children: ReactNode; isGuest: boolean }) => {
  const [actionsUsed, setActionsUsed] = useState(() => {
    if (!isGuest) return 0;
    return parseInt(sessionStorage.getItem("apeiron_guest_actions") || "0", 10);
  });
  const [shouldShowSignupModal, setShouldShowSignupModal] = useState(false);
  const maxFreeActions = 3;

  const trackAction = useCallback(() => {
    if (!isGuest) return true;
    if (actionsUsed >= maxFreeActions) {
      setShouldShowSignupModal(true);
      return false;
    }
    const next = actionsUsed + 1;
    setActionsUsed(next);
    sessionStorage.setItem("apeiron_guest_actions", String(next));
    return true;
  }, [isGuest, actionsUsed, maxFreeActions]);

  return (
    <GuestModeContext.Provider value={{ isGuest, actionsUsed, maxFreeActions, shouldShowSignupModal, setShouldShowSignupModal, trackAction }}>
      {children}
    </GuestModeContext.Provider>
  );
};

export const useGuestMode = () => useContext(GuestModeContext);
