import axios from "axios";

interface SendOTPParams {
  telegramId: number;
}

const useSendOTP = () => {
  const sendOTP = async ({ telegramId }: SendOTPParams): Promise<boolean> => {
    try {
      const res = await axios.post("/api/send-otp", { telegramId });

      if (res.data.status === "SUCCESS") {
        return true;
      } else {
        throw new Error("Failed to Send OTP");
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  return { sendOTP };
};

export default useSendOTP;
