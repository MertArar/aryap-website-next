import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "KVKK | Aryap Ahşap & Tasarım",
  description:
    "Aryap Ahşap & Tasarım kişisel verilerin korunmasına ilişkin aydınlatma metni.",
};

type KVKKSection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  afterBullets?: string[];
};

const sections: KVKKSection[] = [
  {
    title:
      "1- Kişisel Verilerin Toplanması, Çerezler Hakkında Bilgilendirme ve Veri Toplanmasının Amacı",
    paragraphs: [
      "Kişisel verilerin toplanması sağlanan hizmete bağlı olarak değişkenlik gösterebilir. Bununla birlikte kişisel veriler otomatik ya da otomatik olmayan yöntemlerle onay veya imza ile tanzim edilen işlemlere ilişkin tüm sözleşmeler, bilgilendirme formları ve sair belgeler ile uzaktan bağlantı ya da veri aktarımı sırasında, iletişim formu ya da Yargıtay Başkanlığına ait ……gov.tr uzantılı tüm e-posta hesapları üzerinden iletilen talepler ile ilgili yapılan her türlü görüşmede internet sitesi, mobil uygulamalar ve benzeri vasıtalarla toplanabilecektir.",
      "Kişisel verilerin toplanmasındaki amaç; ARYAP HIRDAVAT MOBİLYA İNŞAAT YAZILIM SANAYİİ TİCARET LTD. ŞTİ. bünyesinde ihtiyaç duyulan hizmetlerin tekilleştirilmesi ve daha az kişisel veri alınması, bilgi güvenliği süreçlerinin yürütülmesi, güvenlik ve risk değerlendirmesi yapılması, erişim yetkilerinin dağılımının sağlanması, internet sitesinin kullanımına dair analiz yapılması, daha iyi hizmet sunmak için iletişim kanallarının kullanıcılara özgü hale getirilmesi, ziyaretçi kayıtlarının oluşturulması ve takibinin sağlanması ile daha iyi ve hızlı bilgiye ulaşılması ve kullanıcı profili oluşturulması, çağrı merkezi kayıtları ile taleplerin takibinin sağlanması ve sonuçlandırılması, iş faaliyetlerinin incelenmesi ve denetlenmesi yoluyla bu faaliyetlerin mevzuata uygun şekilde icra edilmesi, eğitim ve etik alanındaki çalışmalara katkı sağlanması, kanuni yükümlülüklerin veya yetkili idari kuruluşların, kurumların ve kişilerin taleplerinin yerine getirilmesi amaçlarıyla ve gizlilik koşullarına uymak kaydı ile gerektiğinde paylaşmaktır.",
      "Ayrıca https://www.aryapahsap.com adresli internet sitesi ile mobil uygulamasında çeşitli amaçlarla çerezler kullanmakta ve bu çerezler vasıtasıyla kişisel veriler toplanarak da işlenmektedir. Çerezlerin toplanmasındaki amaç;",
    ],
    bullets: [
      "ARYAP HIRDAVAT MOBİLYA İNŞAAT YAZILIM SANAYİİ TİCARET LTD. ŞTİ. web ve mobil uygulamasının gerekli temel fonksiyonlarını gerçekleştirmek,",
      "Sistemi ve uygulamayı analiz etmek ve performansını arttırmak,",
      "Kişiselleştirme ile hedefleme faaliyeti gerçekleştirmek,",
      "Sistemin işlevselliğini arttırmak ve kullanım kolaylığı sağlamaktır.",
    ],
    afterBullets: [
      "Kullanıcıların ARYAP HIRDAVAT MOBİLYA İNŞAAT YAZILIM SANAYİİ TİCARET LTD. ŞTİ. sistemine girmiş oldukları bilgilere üçüncü kişilerin erişimi engellenmiş olup kişisel bilgilerin gizliliğini korumak amacıyla sistem ve internet alt yapısı en güvenilir seviyede tutularak gerekli önlemler alınmaktadır.",
      "Çerezlerin cihazda tutulması, tarayıcıda gerekli ayarlar yapılarak engellenebilecektir. Bu konuda detaylar için tarayıcı üreticisinin yardım seçeneğine başvurulabilir.",
    ],
  },
  {
    title: "2- Kişisel Veri İşleme İlkeleri",
    paragraphs: [
      "ARYAP HIRDAVAT MOBİLYA İNŞAAT YAZILIM SANAYİİ TİCARET LTD. ŞTİ., KVK Kanunun 4. maddesinde “Kişisel Verilerin İşlenme Amaçları” başlığında altında belirtilen amaçlar çerçevesinde KVK Kanunu ve diğer kanunlarda öngörülen usul ve esaslara uygun olarak kişisel verileri işleyebilir.",
      "Kişisel verilerin işlenmesinde aşağıdaki ilkelere uyulur:",
    ],
    bullets: [
      "Hukuka ve dürüstlük kurallarına uygun olma.",
      "Doğru ve gerektiğinde güncel olma.",
      "Belirli, açık ve meşru amaçlar için işlenme.",
      "İşlendikleri amaçla bağlantılı, sınırlı ve ölçülü olma.",
      "İlgili mevzuatta öngörülen veya işlendikleri amaç için gerekli olan süre kadar muhafaza edilme.",
    ],
  },
  {
    title: "3- Kişisel Verilerin İşlenmesi",
    paragraphs: [
      "ARYAP HIRDAVAT MOBİLYA İNŞAAT YAZILIM SANAYİİ TİCARET LTD. ŞTİ. tarafından aşağıda yer alanlar dahil ve bunlarla sınırlı olmaksızın bu maddede belirtilen amaçlar ile bağlantılı, sınırlı ve ölçülü şekilde KVK Kanunu’nun 5. ve 8. maddeleri uyarınca ve/veya ilgili mevzuattaki istisnaların varlığı halinde kişisel veriler mevzuat uyarınca gerekli olan hallerde rıza doğrultusunda, aksi hallerde rıza aranmaksızın yukarıdaki amaçlar doğrultusunda işlenebilecektir.",
      "Kişisel veriler, her türlü sözlü, yazılı ya da elektronik ortamda, yukarıda yer verilen amaçlar doğrultusunda hizmetlerin sunulabilmesi ve bu kapsamda yasadan doğan mesuliyetlerin eksiksiz ve doğru bir şekilde yerine getirebilmesi için işlenmesini gerektiren süre ile sınırlı olarak işlenmekte, sürelerin dolmasının ardından ise silinmekte, yok edilmekte veya anonim hale getirilmektedir.",
      "Bunların yanında kanunlarda açıkça öngörülen hallerde, veri sorumlusu sıfatıyla Yargıtay Başkanlığının hukuki yükümlülüğünü yerine getirebilmesi için zorunlu olan, ilgili kişinin kendisi tarafından alenileştirilen ve o kişinin temel hak ve özgürlüklerine zarar vermemek kaydıyla veri sorumlusu sıfatını haiz Yargıtay Başkanlığının meşru menfaatleri için işlenmesi zorunlu olan veriler, bu başlık altında belirtilen sürelerin geçmesi durumunda ancak bu cümlede tahdidi olarak sayılmış amaçların gerçekleştirilmesi için kullanılabilecektir. Bu nedenlerle saklanan kişisel verilere başka bir amaç ile erişilmesine izin verilmeyecek ve ancak zaruri durumlarda bu veriler kullanılabilecektir. Sayılan zaruri durumların sona ermesi halinde kişisel veriler usulüne uygun olarak silinecek, yok edilecek veya anonim hale getirilecektir.",
    ],
  },
  {
    title: "4- İşlenecek Kişisel Veriler",
    bullets: [
      "Kimlik Bilgileri: Ad, Soyad, T.C. kimlik numarası, doğum yeri ve tarihi, medeni hal, cinsiyet ve diğer kimlik verileri.",
      "İletişim Bilgileri: Adres, telefon numarası, elektronik posta adresi ve sair iletişim verileri.",
      "Hukuki İşlem: Adli makamlarla yazışmalardaki bilgiler, mahkemelerden bilgi ve belge talepleri vb.",
      "İşlem Güvenliği: IP adresi bilgileri, ARYAP HIRDAVAT MOBİLYA İNŞAAT YAZILIM SANAYİİ TİCARET LTD. ŞTİ. sistemine giriş çıkış bilgileri ile süreleri, şifre ve parola bilgileri v.b.",
      "Sistem Kullanımında Kullanıcı Alışkanlıklarına İlişkin Bilgiler: Toplanan kişisel veriler, KVK Kanunu tarafından öngörülen temel ilkelere uygun olarak ve KVK Kanunu’nun 5. ve 6. maddelerinde belirtilen kişisel veri işleme şartları ve amaçları dahilinde işlenecektir. Kişisel verilerin işlenmesi KVK Kanunu ve ilgili mevzuatta sayılan şekillerde söz konusu programa üyelik ve giriş yapıldığı andan itibaren başlayacak ve devam edecektir.",
    ],
  },
  {
    title:
      "5- İşlenen Kişisel Verilerin Kimlere, Hangi Amaçla ve Nasıl Aktarılabileceği",
    paragraphs: [
      "ARYAP HIRDAVAT MOBİLYA İNŞAAT YAZILIM SANAYİİ TİCARET LTD. ŞTİ. tarafından toplanan kişisel veriler; 6698 sayılı KVK Kanunu’nun 5. ve 6. maddelerinde belirtilen kişisel veri işleme şartları kapsamında belirtilmiş amaçlarla sınırlı olarak, KVK Kanunu’nun 8. ve 9. maddelerine uygun olmak suretiyle Yargıtay ile ilişki içerisinde olan kişilerin hukuki, teknik ve ticari güvenliğinin temini amacıyla üçüncü kişilere ve kurumlara aktarılabilecektir.",
      "Kişisel verilerin üçüncü kişilerle paylaşılması gereken sebeplerin varlığı halinde ise aktarılan bilgiler sadece gerektiği kadarı ile ve ilgili olduğu ölçüde aktarılacaktır.",
    ],
  },
  {
    title: "6- KVK Kanunu Gereği Kişisel Verilerin İşlenme Şartları",
    paragraphs: [
      "Kişisel veriler kural olarak ilgili kişinin açık rızası olmaksızın işlenemez.",
      "Aşağıdaki şartlardan birinin varlığı hâlinde ilgili kişinin açık rızası aranmaksızın kişisel verilerinin işlenmesi mümkündür:",
    ],
    bullets: [
      "Kanunlarda açıkça öngörülmesi,",
      "Fiili imkânsızlık nedeniyle rızasını açıklayamayacak durumda bulunan veya rızasına hukuki geçerlilik tanınmayan kişinin kendisinin ya da bir başkasının hayatı veya beden bütünlüğünün korunması için zorunlu olması,",
      "Bir sözleşmenin kurulması veya ifasıyla doğrudan doğruya ilgili olması kaydıyla, işlenmesinin gerekli olması,",
      "Veri sorumlusunun hukuki yükümlülüğünü yerine getirebilmesi için zorunlu olması,",
      "İlgili kişi tarafından alenileştirilmiş olması,",
      "Bir hakkın tesisi, kullanılması veya korunması için veri işlemenin zorunlu olması,",
      "İlgili kişinin temel hak ve özgürlüklerine zarar vermemek kaydıyla, veri sorumlusunun meşru menfaatleri için veri işlenmesinin zorunlu olması.",
    ],
  },
  {
    title:
      "7- Kişisel Verilerin Silinmesi, Yok Edilmesi ve Anonim Hale Getirilmesi (KVKK m. 7)",
    bullets: [
      "İlgili mevzuat hükümlerine uygun olarak işlenmiş olmasına rağmen, işlenmesini gerektiren sebeplerin ortadan kalkması hâlinde kişisel veriler resen veya ilgili kişinin talebi üzerine veri sorumlusu tarafından silinir, yok edilir veya anonim hâle getirilir.",
      "Kişisel verilerin silinmesi, yok edilmesi veya anonim hâle getirilmesine ilişkin diğer mevzuat hükümleri saklıdır.",
    ],
  },
  {
    title: "8- Veri Sahibinin Hakları (KVKK m. 11)",
    bullets: [
      "Kişisel veri işlenip işlenmediğini öğrenme,",
      "Kişisel verileri işlenmişse buna ilişkin bilgi talep etme,",
      "Kişisel verilerin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme,",
      "Yurt içinde veya yurt dışında kişisel verilerin aktarıldığı üçüncü kişileri öğrenme,",
      "Kişisel verilerin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme ve bu kapsamda yapılan işlemin kişisel verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme,",
      "KVK Kanunu ve ilgili diğer mevzuat hükümlerine uygun olarak işlenmiş olmasına rağmen, işlenmesini gerektiren sebeplerin ortadan kalkması hâlinde kişisel verilerin silinmesini veya yok edilmesini isteme ve bu kapsamda yapılan işlemin kişisel verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme,",
      "İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi halinde kişinin kendisi aleyhine bir sonucun ortaya çıkmasına itiraz etme,",
      "Kişisel verilerin kanuna aykırı olarak işlenmesi sebebiyle zarara uğraması hâlinde zararın giderilmesini talep etme.",
    ],
  },
  {
    title: "9- Veri Sahibinin Başvuru Şekli",
    paragraphs: [
      "Yukarıdaki başlık altında sıralanan haklara ilişkin talepte bulunulurken, başvuranın kimliğinin tespitine elverişli bilgiler ile KVK Kanunu’nun 11. maddesinde öngörülen ve kullanılması talep edilen hakka yönelik açıklamalar http://www.aryapahsap.com internet adresinde yer alan KVKK Başvuru Formu’na yazılmalı ve doldurulan formun imzalı bir nüshası “Fevziçakmak, Milenyum Caddesi ASPAK Sanayi Sitesi D:2, No:73, 42050 Karatay/Konya” adresine posta ile gönderilmelidir. Bu yöntem dışında doldurulan form, kimlik belgesi ile bizzat elden iletilebilir, noter kanalıyla veya 6698 sayılı Kanunu’nun 13. maddesinin 1. fıkrası gereğince bu Kanunda belirtilen diğer yöntemler ile ARYAP HIRDAVAT MOBİLYA İNŞAAT YAZILIM SANAYİİ TİCARET LTD. ŞTİ.’ye gönderilebilir.",
      "Başvurular Türkçe yapılmalıdır. Başvurularda, ad ve soyad, başvuru yazılı ise imza, Türkiye Cumhuriyeti vatandaşları için T.C. kimlik numarası, yabancılar için uyruğu, pasaport numarası/kimlik numarası, tebligata esas yerleşim yeri veya işyeri adresi, varsa bildirime esas elektronik posta adresi, telefon veya faks numarası ile talep konusu yazılmalıdır.",
      "Başvurularda talep edilen hususun açık ve anlaşılır olması, içeriğinin başvuranın şahsı ile ilgili bulunması, başkası adına hareket edilmesi halinde bu konuda özel olarak yetkilendirilmesi ve bu yetkinin belgelendirilmesi, başvuruda kimlik ve adres bilgilerine yer verilmesi gerekir.",
      "İşbu form üzerinde yer verilen hususlar ile ilgili olarak, hukuki ve teknolojik gelişmeler doğrultusunda değişiklikler yapılabilir.",
    ],
  },
  {
    title: "10- Veri Sahibine Cevap Verilmesi",
    paragraphs: [
      "Yargıtay Genel Sekreterliğine iletilen haklara ilişkin talepler en kısa sürede ve en geç otuz gün içinde ücretsiz olarak sonuçlandırılacaktır. Ancak, işlemin ayrıca bir maliyet doğurması halinde, Kişisel Verileri Koruma Kurulu’nca belirlenen tarifedeki ücret alınacaktır.",
    ],
  },
];

export default function KVKKPage() {
  return (
    <main className="min-h-screen bg-[#f8f8f8] text-[#171717]">
      <section className="relative overflow-hidden bg-[#0d0d0d] px-6 pb-24 pt-36 md:px-10 lg:px-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-160px] top-[-180px] h-[420px] w-[420px] rounded-full bg-white/10 blur-[120px]" />
          <div className="absolute bottom-[-220px] right-[-160px] h-[460px] w-[460px] rounded-full bg-white/10 blur-[140px]" />
        </div>

        <div className="relative mx-auto max-w-6xl">
          <span className="mb-5 inline-block text-xs font-semibold uppercase tracking-[0.35em] text-white/45">
            ARYAP HIRDAVAT MOBİLYA İNŞAAT YAZILIM SANAYİİ TİCARET LTD. ŞTİ.
          </span>

          <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
            Kişisel Verilerin Korunmasına İlişkin Aydınlatma Metni
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-8 text-white/65 md:text-lg">
            6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında
            hazırlanan aydınlatma metni.
          </p>
        </div>
      </section>

      <section className="px-6 py-16 md:px-10 lg:px-20 lg:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[300px_1fr]">
          <aside className="h-fit rounded-[28px] border border-black/10 bg-white p-6 shadow-sm lg:sticky lg:top-28">
            <h2 className="text-lg font-semibold text-[#111]">İçindekiler</h2>

            <nav className="mt-6 max-h-[62vh] space-y-2 overflow-y-auto pr-2">
              {sections.map((section, index) => (
                <a
                  key={section.title}
                  href={`#kvkk-${index + 1}`}
                  className="block rounded-xl px-3 py-2 text-sm leading-6 text-black/55 transition duration-300 hover:bg-black/[0.04] hover:text-black"
                >
                  {section.title}
                </a>
              ))}
            </nav>
          </aside>

          <div className="rounded-[32px] border border-black/10 bg-white p-6 shadow-sm md:p-10 lg:p-12">
            <div className="border-b border-black/10 pb-10">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-black/35">
                Giriş
              </p>

              <h2 className="mt-4 text-2xl font-semibold leading-tight text-[#111] md:text-4xl">
                Kişisel Verilerin Korunmasına İlişkin Aydınlatma Metni
              </h2>

              <div className="mt-7 space-y-5 text-base leading-8 text-black/65">
                <p>
                  Özel hayatın gizliliği başta olmak üzere temel hak ve
                  özürlüklerin korunması amacıyla kişisel verilerle ilgili
                  düzenlenen 7 Nisan 2016 tarihli ve 29677 sayılı Resmî
                  Gazete’de yayımlanan 6698 sayılı Kişisel Verilerin Korunması
                  Kanunu ile bu Kanunun “Veri Sorumlusunun Aydınlatma
                  Yükümlülüğü” başlıklı 10. maddesi ve 10 Mart 2018 tarih ve
                  30356 sayılı Resmî Gazete’de yayımlanan Aydınlatma
                  Yükümlülüğünün Yerine Getirilmesinde Uyulacak Usul ve Esaslar
                  Hakkında Tebliğ uyarınca “Aydınlatma Yükümlülüğü”nü yerine
                  getirmek amacıyla bu “Aydınlatma Metni” hazırlanmıştır.
                </p>

                <p>
                  Kişisel veri sahipleri, kişisel verileri 6698 sayılı Kişisel
                  Verilerin Korunması Kanunu bundan böyle “KVK Kanunu” olarak
                  ifade edilecektir ve sair mevzuat hükümleri gereğince kişisel
                  verileri toplanan, işlenen ve aktarılan kişilerdir.
                </p>

                <p>
                  Veri sorumlusu ise kişisel verileri bu metinde açıklandığı
                  üzere kaydedebilen, saklayabilen, güncelleyebilen, mevzuatın
                  ya da anlaşmaların izin verdiği veya zorunlu kıldığı
                  durumlarda üçüncü kişiler ile hizmet alan kişinin yakınları
                  ve/veya hizmet alanın çalışanı/sigortalısı olduğu kamu
                  ve/veya özel hukuk tüzel kişileri, diğer kamu ve/veya özel
                  hukuk tüzel kişileri, faaliyetlerini yürütmek üzere hizmet
                  aldığı veya işbirliği yaptığı üçüncü kişilerle paylaşabilen,
                  aktarabilen, sınıflandırılabilen kişidir. Bu hüküm uyarınca
                  Yargıtay Genel Sekreterliği, Yargıtay Başkanlığında
                  koordinasyonu sağlayacak üst düzey birim olarak belirlenmiştir.
                </p>

                <p>
                  ARYAP HIRDAVAT MOBİLYA İNŞAAT YAZILIM SANAYİİ TİCARET LTD.
                  ŞTİ. tarafından kişisel verilerin güvenliğine azami hassasiyet
                  gösterilmektedir. Edinilen kişisel veriler bu aydınlatma
                  metninde belirtilen ve ARYAP HIRDAVAT MOBİLYA İNŞAAT YAZILIM
                  SANAYİİ TİCARET LTD. ŞTİ. giriş yapılması ile kurulan ilişki
                  dışında kullanılmamakta, başka amaçlarla üçüncü şahıs ya da
                  tüzel kişilerle paylaşılmamakta, faaliyet dışı hiçbir nedenle
                  ve ticari amaçlarla kullanılmamakta ya da satılmamaktadır.
                  Kişisel verilerin üçüncü kişilerle paylaşılmasını gerektiren
                  sebeplerin varlığı halinde ise bu bilgiler sadece gerektiği
                  kadar ve ilgili olduğu ölçüde aktarılacaktır.
                </p>

                <p>
                  Kişisel veriler belirtilen işleme amaçları dışında
                  kullanılmayacak, açık bir rıza olmaksızın ya da ilgili
                  mevzuatta öngörülen sebepler dışında üçüncü kişilere
                  aktarılmayacak veya ifşa edilmeyecektir.
                </p>
              </div>
            </div>

            <div className="mt-12 space-y-14">
              {sections.map((section, index) => (
                <article
                  key={section.title}
                  id={`kvkk-${index + 1}`}
                  className="scroll-mt-32"
                >
                  <h3 className="mb-6 text-xl font-semibold leading-snug text-[#111] md:text-2xl">
                    {section.title}
                  </h3>

                  <div className="space-y-5">
                    {section.paragraphs?.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-base leading-8 text-black/65"
                      >
                        {paragraph}
                      </p>
                    ))}

                    {section.bullets && (
                      <ul className="space-y-3">
                        {section.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="flex gap-3 text-base leading-8 text-black/65"
                          >
                            <span className="mt-[13px] h-1.5 w-1.5 shrink-0 rounded-full bg-black/35" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {section.afterBullets?.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-base leading-8 text-black/65"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-16 rounded-[28px] bg-[#f5f5f5] p-6 md:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-black/35">
                İletişim Bilgileri
              </p>

              <h3 className="mt-3 text-2xl font-semibold text-[#111]">
                Başvuru ve İletişim Adresi
              </h3>

              <p className="mt-5 text-base leading-8 text-black/65">
                KVKK kapsamındaki başvurular aşağıda yer alan adrese
                iletilebilir.
              </p>

              <div className="mt-6 rounded-2xl border border-black/10 bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-black/35">
                  Adres
                </p>

                <p className="mt-3 text-base leading-7 text-black/70">
                  Fevziçakmak, Milenyum Caddesi ASPAK Sanayi Sitesi D:2, No:73,
                  42050 Karatay/Konya
                </p>
              </div>
            </div>

            <div className="mt-10 flex justify-center">
              <Link
                href="/"
                className="group inline-flex items-center gap-3 rounded-full bg-[#111] px-7 py-4 text-sm font-semibold text-white transition duration-300 hover:bg-[#9b8364]"
              >
                <span>Ana Sayfaya Dön</span>
                <span className="transition duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}