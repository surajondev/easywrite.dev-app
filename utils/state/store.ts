import { create } from "zustand";

type AnalyticalState = {
  analyticalData: any;
  analyticalError: any;
};

type AnalyticalAction = {
  updateAnalyticalData: (
    analyticalData: AnalyticalState["analyticalData"]
  ) => void;
  updateAnalyticalError: (
    analyticalData: AnalyticalState["analyticalError"]
  ) => void;
};

type ArticleState = {
  articleData: any;
};

type ArticleAction = {
  updateArticleData: (articleData: ArticleState["articleData"]) => void;
};

type PlatformState = {
  devtoData: any;
  hashnodeData: any;
  checkData: any;
};

type PlatformAction = {
  updateDevtoData: (devtoData: PlatformState["devtoData"]) => void;
  updateHashnodeData: (hashnodeData: PlatformState["hashnodeData"]) => void;
  updateCheckData: (checkData: PlatformState["checkData"]) => void;
};

export const useAnalyticalStore = create<AnalyticalState & AnalyticalAction>(
  (set) => ({
    analyticalData: null,
    analyticalError: null,
    updateAnalyticalData: (data: any) => set(() => ({ analyticalData: data })),
    updateAnalyticalError: (data: any) =>
      set(() => ({ analyticalError: data })),
  })
);

export const useArticleStore = create<ArticleState & ArticleAction>((set) => ({
  articleData: null,
  updateArticleData: (data: any) => set(() => ({ articleData: data })),
}));

export const usePlatformStore = create<PlatformState & PlatformAction>(
  (set) => ({
    devtoData: null,
    hashnodeData: null,
    checkData: null,
    updateDevtoData: (data: any) => set(() => ({ devtoData: data })),
    updateHashnodeData: (data: any) => set(() => ({ hashnodeData: data })),
    updateCheckData: (data: any) => set(() => ({ checkData: data })),
  })
);
