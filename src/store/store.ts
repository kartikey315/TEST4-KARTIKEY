import { create } from "zustand";
import { persist } from "zustand/middleware";

interface OTPState {
  telegramID: string;
  otpVerified: boolean;
  setOtpVerified: () => void;
  setTelegramId: (telegramID: string) => void;
  isOtpVerifiedForTelegramId: (telegramID: string) => boolean;
}

export const useOTPStore = create<OTPState>()(
  persist(
    (set, get) => ({
      telegramID: "",
      otpVerified: false,
      setOtpVerified: () => set(() => ({ otpVerified: true })),
      setTelegramId: (telegramID: string) => set(() => ({ telegramID })),
      isOtpVerifiedForTelegramId: (id: string) => {
        const state = get();
        return state.telegramID === id && state.otpVerified;
      },
    }),
    {
      name: "OTP store",
    }
  )
);
