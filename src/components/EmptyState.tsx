import v1 from '../public/v1-1_need-input.webp';
import v2 from '../public/v2-1_need-input.webp';
import v3 from '../public/v3-1_need-input.webp';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../i18n';
import { useAvatar } from '../contexts/AvatarContext';

export default function EmptyState() {
  const { lang } = useLanguage();
  const t = translations[lang].empty;
  const { avatar } = useAvatar();

  const src = avatar === 'v1' ? v1 : avatar === 'v2' ? v2 : v3;

  return (
    <div className="empty">
      <div className="empty-illustration">
        <img src={src} alt={t.listEmptyTitle} className="empty-illustration-image" />
      </div>
      <p className="empty-title">{t.listEmptyTitle}</p>
      <p className="empty-sub">{t.listEmptySub}</p>
    </div>
  );
}
