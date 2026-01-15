import { useState } from 'react';
import { Plus, Loader2 } from 'lucide-react';

interface Props {
  onAdd: (name: string) => Promise<void>;
  adding: boolean;
}

export default function AddItemForm({ onAdd, adding }: Props) {
  const [value, setValue] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    await onAdd(value.trim());
    setValue('');
  };

  return (
    <form onSubmit={submit} className="form">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Was brauchst du?"
        className="input"
      />
      <button
        type="submit"
        disabled={adding || !value.trim()}
        className="add-button"
        aria-disabled={adding || !value.trim()}
      >
        {adding ? <Loader2 className="icon spin" /> : <Plus className="icon" />}
      </button>
    </form>
  );
}
