/**
 * GRUPO NORTÃO — PaymentSection
 * 
 * Integração Mercado Pago: Pix (5% off), Cartão (12x), Boleto.
 * SEGURANÇA: Nenhum dado de cartão armazenado no frontend.
 * Dados vão direto para API do Mercado Pago via SDK.
 */

import { useState, useCallback } from 'react';
import { CreditCard, QrCode, FileText, Lock, Shield, CheckCircle } from 'lucide-react';
import { formatPrice } from '../../context/CartContext';

const METHODS = [
  { id: 'pix', name: 'Pix', icon: QrCode, desc: 'Aprovação imediata', discount: 0.05, tag: '5% OFF' },
  { id: 'credit_card', name: 'Cartão de Crédito', icon: CreditCard, desc: 'Até 12x sem juros', discount: 0, tag: null },
  { id: 'boleto', name: 'Boleto Bancário', icon: FileText, desc: 'Vencimento em 3 dias', discount: 0, tag: null },
];

export default function PaymentSection({ total = 0, onPaymentReady, disabled = false }) {
  const [selected, setSelected] = useState('pix');
  const [installments, setInstallments] = useState(1);

  const method = METHODS.find(m => m.id === selected);
  const discount = method?.discount || 0;
  const finalTotal = total * (1 - discount);

  const installmentOptions = [];
  for (let i = 1; i <= 12; i++) {
    const val = finalTotal / i;
    if (val >= 10) {
      installmentOptions.push({
        value: i,
        label: i === 1 ? `1x de ${formatPrice(finalTotal)} (à vista)` : `${i}x de ${formatPrice(val)} sem juros`,
      });
    }
  }

  const handleConfirm = useCallback(() => {
    if (!onPaymentReady) return;
    onPaymentReady({
      method: selected,
      installments: selected === 'credit_card' ? installments : 1,
      total: finalTotal,
      discount: discount > 0 ? discount : null,
    });
  }, [selected, installments, finalTotal, discount, onPaymentReady]);

  return (
    <div style={s.wrap}>
      <h3 style={s.title}><Lock size={18} /> Pagamento seguro</h3>

      <div style={s.badge}><Shield size={14} /><span>Processado por <strong>Mercado Pago</strong> — Dados protegidos</span></div>

      {/* Métodos */}
      <div style={s.methods}>
        {METHODS.map(pm => (
          <label key={pm.id} style={{...s.method, borderColor: selected === pm.id ? 'var(--green-accent)' : 'var(--graphite-100)', backgroundColor: selected === pm.id ? 'var(--green-soft)' : '#fff'}}>
            <input type="radio" name="pay" checked={selected === pm.id} onChange={() => { setSelected(pm.id); setInstallments(1); }} style={s.radio} />
            <div style={s.mIcon}><pm.icon size={20} /></div>
            <div style={s.mInfo}>
              <div style={s.mName}>{pm.name}{pm.tag && <span style={s.mTag}>{pm.tag}</span>}</div>
              <div style={s.mDesc}>{pm.desc}</div>
            </div>
          </label>
        ))}
      </div>

      {/* Detalhes */}
      <div style={s.details}>
        {selected === 'pix' && (
          <div style={s.detailBox}>
            <div style={s.highlight}><QrCode size={20} style={{color:'var(--green-accent)'}} /><div><div style={s.dLabel}>Valor com desconto Pix</div><div style={s.dValue}>{formatPrice(finalTotal)}</div></div></div>
            <p style={s.note}>Após confirmar, você recebe QR Code e código copia-e-cola. Aprovação imediata.</p>
          </div>
        )}
        {selected === 'credit_card' && (
          <div style={s.detailBox}>
            <label style={s.fLabel}>Parcelas</label>
            <select value={installments} onChange={e => setInstallments(Number(e.target.value))} style={s.select}>
              {installmentOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <p style={s.note}>Dados do cartão coletados pelo Mercado Pago. Nenhum dado armazenado em nosso site.</p>
            <div style={s.secure}><Lock size={12} /><span>SSL · PCI DSS · Mercado Pago</span></div>
          </div>
        )}
        {selected === 'boleto' && (
          <div style={s.detailBox}>
            <div style={s.highlight}><FileText size={20} style={{color:'var(--navy-800)'}} /><div><div style={s.dLabel}>Valor do boleto</div><div style={s.dValue}>{formatPrice(finalTotal)}</div></div></div>
            <p style={s.note}>Boleto gerado após confirmação. Vencimento em 3 dias úteis. Pedido confirmado após compensação.</p>
          </div>
        )}
      </div>

      {/* Resumo */}
      <div style={s.summary}>
        {discount > 0 && <div style={s.discRow}><span>Desconto Pix ({Math.round(discount*100)}%)</span><span style={s.discVal}>- {formatPrice(total * discount)}</span></div>}
        <div style={s.finalRow}><span>Total a pagar</span><span style={s.finalVal}>{formatPrice(finalTotal)}</span></div>
      </div>

      {/* Confirmar */}
      <button onClick={handleConfirm} disabled={disabled} style={{...s.confirmBtn, opacity: disabled ? 0.5 : 1, cursor: disabled ? 'not-allowed' : 'pointer'}}>
        <CheckCircle size={18} />
        {selected === 'pix' && 'Confirmar e Gerar Pix'}
        {selected === 'credit_card' && 'Confirmar e Pagar'}
        {selected === 'boleto' && 'Confirmar e Gerar Boleto'}
      </button>

      <p style={s.legal}>Ao confirmar, você concorda com os Termos de Uso e Política de Privacidade do Grupo Nortão.</p>
    </div>
  );
}

const s = {
  wrap: { display:'flex', flexDirection:'column', gap:'1.25rem' },
  title: { display:'flex', alignItems:'center', gap:'.5rem', fontFamily:'var(--font-display)', fontWeight:800, fontSize:'1rem', color:'var(--graphite-900)' },
  badge: { display:'flex', alignItems:'center', gap:'.5rem', padding:'.75rem 1rem', borderRadius:'var(--radius-md)', backgroundColor:'rgba(245,179,1,0.06)', border:'1px solid rgba(245,179,1,0.15)', fontSize:'.75rem', color:'var(--graphite-700)' },
  methods: { display:'flex', flexDirection:'column', gap:'.5rem' },
  method: { display:'flex', alignItems:'center', gap:'.75rem', padding:'1rem', borderRadius:'var(--radius-md)', border:'2px solid', cursor:'pointer', transition:'all .2s' },
  radio: { accentColor:'var(--green-accent)', width:'18px', height:'18px', flexShrink:0 },
  mIcon: { width:'40px', height:'40px', borderRadius:'10px', backgroundColor:'var(--graphite-100)', color:'var(--graphite-700)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 },
  mInfo: { flex:1 },
  mName: { fontWeight:700, fontSize:'.875rem', color:'var(--graphite-900)', display:'flex', alignItems:'center', gap:'.5rem' },
  mTag: { fontSize:'.5625rem', fontWeight:800, textTransform:'uppercase', letterSpacing:'.06em', padding:'.15rem .5rem', borderRadius:'var(--radius-full)', backgroundColor:'var(--green-accent)', color:'var(--navy-900)' },
  mDesc: { fontSize:'.75rem', color:'var(--graphite-500)', marginTop:'.125rem' },
  details: {},
  detailBox: { padding:'1.25rem', borderRadius:'var(--radius-md)', backgroundColor:'var(--off-white)', border:'1px solid var(--graphite-100)', display:'flex', flexDirection:'column', gap:'.75rem' },
  highlight: { display:'flex', alignItems:'center', gap:'.75rem' },
  dLabel: { fontSize:'.75rem', color:'var(--graphite-500)', fontWeight:500 },
  dValue: { fontFamily:'var(--font-display)', fontWeight:800, fontSize:'1.375rem', color:'var(--navy-800)' },
  note: { fontSize:'.8125rem', lineHeight:1.6, color:'var(--graphite-500)' },
  secure: { display:'flex', alignItems:'center', gap:'.375rem', fontSize:'.6875rem', color:'var(--graphite-500)', padding:'.5rem .75rem', borderRadius:'var(--radius-sm)', backgroundColor:'rgba(0,0,0,0.02)' },
  fLabel: { fontSize:'.75rem', fontWeight:600, color:'var(--graphite-700)', textTransform:'uppercase', letterSpacing:'.04em' },
  select: { padding:'.875rem 1rem', border:'2px solid var(--graphite-100)', borderRadius:'var(--radius-md)', fontSize:'.9375rem', fontFamily:'var(--font-body)', color:'var(--graphite-900)', outline:'none', backgroundColor:'#fff', width:'100%' },
  summary: { padding:'1rem', borderRadius:'var(--radius-md)', backgroundColor:'var(--off-white)', display:'flex', flexDirection:'column', gap:'.5rem' },
  discRow: { display:'flex', justifyContent:'space-between', fontSize:'.8125rem', color:'var(--green-deep)' },
  discVal: { fontWeight:700 },
  finalRow: { display:'flex', justifyContent:'space-between', alignItems:'center', paddingTop:'.5rem', borderTop:'1px solid var(--graphite-100)' },
  finalVal: { fontFamily:'var(--font-display)', fontWeight:800, fontSize:'1.5rem', color:'var(--navy-800)' },
  confirmBtn: { width:'100%', display:'flex', alignItems:'center', justifyContent:'center', gap:'.5rem', padding:'1.125rem', backgroundColor:'var(--green-accent)', color:'var(--navy-900)', borderRadius:'var(--radius-md)', fontWeight:700, fontSize:'1rem', border:'none', fontFamily:'var(--font-body)', transition:'all .25s' },
  legal: { fontSize:'.6875rem', color:'var(--graphite-500)', textAlign:'center', lineHeight:1.5 },
};
