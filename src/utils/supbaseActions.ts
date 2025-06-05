import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export async function uploadImage({
  file,
  directory,
}: {
  file: File;
  directory: string;
}): Promise<{ success: true; filePath: string } | { success: false; error: string }> {
  const fileExt = file.name.split('.').pop();
  const uuid = crypto.randomUUID();
  const fileName = `${uuid}.${fileExt}`;
  const filePath = `${directory}/${fileName}`;
  const { error: uploadError, data } = await supabase.storage.from('images').upload(filePath, file);
  if (uploadError) {
    return { success: false, error: uploadError.message };
  }
  return { success: true, filePath: data.path };
}

export async function deleteImage(path: string) {
  const { error: deleteError } = await supabase.storage.from('images').remove([path]);

  if (deleteError) {
    throw deleteError;
  }
}
