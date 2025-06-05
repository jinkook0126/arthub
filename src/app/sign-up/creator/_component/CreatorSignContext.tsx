import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { ChangeRoleFormValues } from '@/schemas/changeRoleSchema';

type CreatorSignPage = 'creator-info' | 'user-info';
interface CreatorSignContextType {
  page: CreatorSignPage;
  creatorForm: ChangeRoleFormValues;
  imageFile: File | null;
}
interface CreatorSignUpdateContextType {
  setPage: (page: CreatorSignPage) => void;
  setCreatorForm: (creatorForm: ChangeRoleFormValues) => void;
  setImageFile: (imageFile: File | null) => void;
}
const CreatorSignContext = createContext<CreatorSignContextType | undefined>(undefined);
const CreatorSignUpdateContext = createContext<CreatorSignUpdateContextType | undefined>(undefined);

export const useCreatorSignState = () => {
  const context = useContext(CreatorSignContext);
  if (!context) {
    throw new Error('CreatorSignContext not found');
  }
  return context;
};

export const useCreatorSignUpdate = () => {
  const context = useContext(CreatorSignUpdateContext);
  if (!context) {
    throw new Error('CreatorSignUpdateContext not found');
  }
  return context;
};

export function CreatorSignProvider({ children }: { children: ReactNode }) {
  const [page, setPage] = useState<CreatorSignPage>('creator-info');
  const [creatorForm, setCreatorForm] = useState<ChangeRoleFormValues>({
    creatorName: '',
    creatorTags: [],
    creatorThumbnail: '',
    creatorDesc: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const value = useMemo(() => ({ page, creatorForm, imageFile }), [page, creatorForm, imageFile]);
  const updateValue = useMemo(
    () => ({ setPage, setCreatorForm, setImageFile }),
    [setPage, setCreatorForm, setImageFile],
  );

  return (
    <CreatorSignContext.Provider value={value}>
      <CreatorSignUpdateContext.Provider value={updateValue}>{children}</CreatorSignUpdateContext.Provider>
    </CreatorSignContext.Provider>
  );
}
