**Espaçamento**
m-4       → margin 1rem em todos os lados
mx-4      → margin horizontal (E + D)
my-4      → margin vertical (Cima + Baixo)
mt-4      → margin-top
mb-4      → margin-bottom
ml-4      → margin-left
mr-4      → margin-right
p-4       → padding 1rem
px-6      → padding horizontal
py-2      → padding vertical
gap-4     → espaço entre itens no flex/grid

**Layout**
flex              → ativa flex
flex-row          → itens em linha
flex-col          → itens em coluna
justify-start     → alinhado à esquerda
justify-center    → centralizado
justify-end       → alinhado à direita
justify-between   → espaço entre itens
justify-around    → espaço uniforme
items-start       → topo
items-center      → meio
items-end         → fundo

**Cores**
🔴 red-50   #fef2f2    🔴 red-100   #fee2e2    🔴 red-200   #fecaca
🔴 red-300  #fca5a5    🔴 red-400   #f87171    🔴 red-500   #ef4444
🔴 red-600  #dc2626    🔴 red-700   #b91c1c    🔴 red-800   #991b1b
🔴 red-900  #7f1d1d

🟠 orange-50   #fff7ed    🟠 orange-100   #ffedd5    🟠 orange-200   #fed7aa
🟠 orange-300  #fdba74    🟠 orange-400   #fb923c    🟠 orange-500   #f97316
🟠 orange-600  #ea580c    🟠 orange-700   #c2410c    🟠 orange-800   #9a3412
🟠 orange-900  #7c2d12

🟡 yellow-50   #fefce8    🟡 yellow-100   #fef9c3    🟡 yellow-200   #fef08a
🟡 yellow-300  #fde047    🟡 yellow-400   #facc15    🟡 yellow-500   #eab308
🟡 yellow-600  #ca8a04    🟡 yellow-700   #a16207    🟡 yellow-800   #854d0e
🟡 yellow-900  #713f12

🟢 green-50   #f0fdf4    🟢 green-100   #dcfce7    🟢 green-200   #bbf7d0
🟢 green-300  #86efac    🟢 green-400   #4ade80    🟢 green-500   #22c55e
🟢 green-600  #16a34a    🟢 green-700   #15803d    🟢 green-800   #166534
🟢 green-900  #14532d

💚 emerald-50   #ecfdf5    💚 emerald-100   #d1fae5    💚 emerald-200   #a7f3d0
💚 emerald-300  #6ee7b7    💚 emerald-400   #34d399    💚 emerald-500   #10b981
💚 emerald-600  #059669    💚 emerald-700   #047857    💚 emerald-800   #065f46
💚 emerald-900  #064e3b

🔵 blue-50   #eff6ff    🔵 blue-100   #dbeafe    🔵 blue-200   #bfdbfe
🔵 blue-300  #93c5fd    🔵 blue-400   #60a5fa    🔵 blue-500   #3b82f6
🔵 blue-600  #2563eb    🔵 blue-700   #1d4ed8    🔵 blue-800   #1e40af
🔵 blue-900  #1e3a8a

🌊 cyan-50   #ecfeff    🌊 cyan-100   #cffafe    🌊 cyan-200   #a5f3fc
🌊 cyan-300  #67e8f9    🌊 cyan-400   #22d3ee    🌊 cyan-500   #06b6d4
🌊 cyan-600  #0891b2    🌊 cyan-700   #0e7490    🌊 cyan-800   #155e75
🌊 cyan-900  #164e63

🟣 purple-50   #faf5ff    🟣 purple-100   #f3e8ff    🟣 purple-200   #e9d5ff
🟣 purple-300  #d8b4fe    🟣 purple-400   #c084fc    🟣 purple-500   #a855f7
🟣 purple-600  #9333ea    🟣 purple-700   #7e22ce    🟣 purple-800   #6b21a8
🟣 purple-900  #581c87

💖 pink-50   #fdf2f8    💖 pink-100   #fce7f3    💖 pink-200   #fbcfe8
💖 pink-300  #f9a8d4    💖 pink-400   #f472b6    💖 pink-500   #ec4899
💖 pink-600  #db2777    💖 pink-700   #be185d    💖 pink-800   #9d174d
💖 pink-900  #831843

⚫ gray-50   #f9fafb    ⚫ gray-100   #f3f4f6    ⚫ gray-200   #e5e7eb
⚫ gray-300  #d1d5db    ⚫ gray-400   #9ca3af    ⚫ gray-500   #6b7280
⚫ gray-600  #4b5563    ⚫ gray-700   #374151    ⚫ gray-800   #1f2937
⚫ gray-900  #111827



**Grid**
grid grid-cols-2      → 2 colunas
md:grid-cols-3        → 3 colunas no tablet
gap-6                 → espaço entre elementos

**Texto e fonte**
text-sm | text-lg | text-2xl | text-6xl   → tamanho
font-light | font-normal | font-bold     → peso
text-center | text-left | text-right     → alinhamento
leading-relaxed | leading-tight          → altura da linha
tracking-wide | tracking-tight           → espaçamento letras


**bordas e arredondamento**
border          → borda fina
border-2        → borda média
border-4        → borda grossa
border-gray-700 → cor da borda

rounded         → cantos arredondados
rounded-lg      → mais arredondado
rounded-full    → círculo

**sombras e hovers**
shadow                  → sombra leve
shadow-lg               → sombra forte
hover:bg-emerald-500    → muda cor no hover
hover:scale-105         → aumenta no hover
transition duration-300 → suaviza animação

**position**
relative                 → referencia p/ filhos absolute
absolute top-0 left-0    → canto superior esquerdo
absolute bottom-0 right-0 → canto inferior direito

translate-x-10   → move 10px pra direita
-translate-y-5   → move 5px pra cima

**responsivity**
sm:   (≥ 640px)
md:   (≥ 768px)
lg:   (≥ 1024px)
xl:   (≥ 1280px)

Exemplo:
<p class="text-base md:text-xl lg:text-3xl">


**animations**
animate-spin     → gira infinito
animate-bounce   → quica
animate-pulse    → efeito pulsar
animate-ping     → sonar

**extras**
overflow-hidden   → esconde conteúdo fora da div
aspect-square     → força quadrado
aspect-video      → força formato 16:9
line-clamp-3      → corta texto em 3 linhas com "..."
backdrop-blur-md  → efeito vidro fosco

**TEXTOS**
text-xs   → 0.75rem (12px)
text-sm   → 0.875rem (14px)
text-base → 1rem (16px)
text-lg   → 1.125rem (18px)
text-xl   → 1.25rem (20px)
text-2xl  → 1.5rem (24px)
text-3xl  → 1.875rem (30px)
text-4xl  → 2.25rem (36px)
text-5xl  → 3rem (48px)
text-6xl  → 3.75rem (60px)
text-7xl  → 4.5rem (72px)
text-8xl  → 6rem (96px)
text-9xl  → 8rem (128px)

font-thin      → 100
font-extralight→ 200
font-light     → 300
font-normal    → 400
font-medium    → 500
font-semibold  → 600
font-bold      → 700
font-extrabold → 800
font-black     → 900

italic      → texto itálico
not-italic  → remove itálico

uppercase   → MAIÚSCULO
lowercase   → minúsculo
capitalize  → Primeira letra maiúscula
normal-case → normal

text-left    → alinhado à esquerda
text-center  → centralizado
text-right   → alinhado à direita
text-justify → justificado

underline         → sublinhado
overline          → linha acima
line-through      → tachado
no-underline      → remove underline

decoration-solid  → sólido
decoration-dashed → tracejado
decoration-dotted → pontilhado
decoration-wavy   → ondulado

decoration-1 | decoration-2 | ... → espessura da linha

text-white
text-black
text-gray-500
text-red-600
text-blue-400
...
