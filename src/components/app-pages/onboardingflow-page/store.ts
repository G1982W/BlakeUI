import { create } from "zustand";

export interface FormData {
    accountType: "personal" | "corporate";
    teamSize: string;
    teamName: string;
    accountPlan: string;
    companyName: string;
    industry: string;
    website: string;
    nameOnCard: string;
    cardNumber: string;
    expirationMonth: string;
    expirationYear: string;
    cvv: string;
    saveCard: boolean;
}

const DEFAULT: FormData = {
    accountType: "personal",
    teamSize: "2-10",
    teamName: "",
    accountPlan: "developer",
    companyName: "",
    industry: "",
    website: "",
    nameOnCard: "",
    cardNumber: "",
    expirationMonth: "",
    expirationYear: "",
    cvv: "",
    saveCard: true
};

interface OnboardingStore {
    currentStep: number;
    formData: FormData;
    next: () => void;
    prev: () => void;
    update: <K extends keyof FormData>(field: K, value: FormData[K]) => void;
    reset: () => void;
}

export const useOnboardingStore = create<OnboardingStore>()((set) => ({
    currentStep: 1,
    formData: DEFAULT,
    next: () => set((s) => ({ currentStep: Math.min(s.currentStep + 1, 5) })),
    prev: () => set((s) => ({ currentStep: Math.max(s.currentStep - 1, 1) })),
    update: (field, value) =>
        set((s) => ({ formData: { ...s.formData, [field]: value } })),
    reset: () => set({ currentStep: 1, formData: DEFAULT })
}));
