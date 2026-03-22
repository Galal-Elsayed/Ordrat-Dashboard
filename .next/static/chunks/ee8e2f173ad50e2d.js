(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,618566,(e,t,a)=>{t.exports=e.r(976562)},63209,361653,e=>{"use strict";let t=(0,e.i(475254).default)("circle-alert",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]);e.s(["default",()=>t],361653),e.s(["AlertCircle",()=>t],63209)},286536,e=>{"use strict";let t=(0,e.i(475254).default)("eye",[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);e.s(["Eye",()=>t],286536)},23750,e=>{"use strict";var t=e.i(843476),a=e.i(647163),s=e.i(225913);let r=(0,s.cva)(`
    flex w-full bg-background border border-input shadow-xs shadow-black/5 transition-[color,box-shadow] text-foreground placeholder:text-muted-foreground/80 
    focus-visible:ring-ring/30  focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px]     
    disabled:cursor-not-allowed disabled:opacity-60 
    [&[readonly]]:bg-muted/80 [&[readonly]]:cursor-not-allowed
    file:h-full [&[type=file]]:py-0 file:border-solid file:border-input file:bg-transparent 
    file:font-medium file:not-italic file:text-foreground file:p-0 file:border-0 file:border-e
    aria-invalid:border-destructive/60 aria-invalid:ring-destructive/10 dark:aria-invalid:border-destructive dark:aria-invalid:ring-destructive/20
  `,{variants:{variant:{lg:"h-10 px-4 text-sm rounded-md file:pe-4 file:me-4",md:"h-8.5 px-3 text-[0.8125rem] leading-(--text-sm--line-height) rounded-md file:pe-3 file:me-3",sm:"h-7 px-2.5 text-xs rounded-md file:pe-2.5 file:me-2.5"}},defaultVariants:{variant:"md"}}),i=(0,s.cva)("flex items-center shrink-0 justify-center bg-muted border border-input shadow-xs shadow-[rgba(0,0,0,0.05)] text-secondary-foreground [&_svg]:text-secondary-foreground/60",{variants:{variant:{sm:"rounded-md h-7 min-w-7 text-xs px-2.5 [&_svg:not([class*=size-])]:size-3.5",md:"rounded-md h-8.5 min-w-8.5 px-3 text-[0.8125rem] leading-(--text-sm--line-height) [&_svg:not([class*=size-])]:size-4.5",lg:"rounded-md h-10 min-w-10 px-4 text-sm [&_svg:not([class*=size-])]:size-4.5"},mode:{default:"",icon:"px-0 justify-center"}},defaultVariants:{variant:"md",mode:"default"}}),o=(0,s.cva)(`
    flex items-stretch
    [&_[data-slot=input]]:grow
    [&_[data-slot=input-addon]:has(+[data-slot=input])]:rounded-e-none [&_[data-slot=input-addon]:has(+[data-slot=input])]:border-e-0
    [&_[data-slot=input-addon]:has(+[data-slot=datefield])]:rounded-e-none [&_[data-slot=input-addon]:has(+[data-slot=datefield])]:border-e-0 
    [&_[data-slot=input]+[data-slot=input-addon]]:rounded-s-none [&_[data-slot=input]+[data-slot=input-addon]]:border-s-0
    [&_[data-slot=input-addon]:has(+[data-slot=button])]:rounded-e-none
    [&_[data-slot=input]+[data-slot=button]]:rounded-s-none
    [&_[data-slot=button]+[data-slot=input]]:rounded-s-none
    [&_[data-slot=input-addon]+[data-slot=input]]:rounded-s-none
    [&_[data-slot=input-addon]+[data-slot=datefield]]:[&_[data-slot=input]]:rounded-s-none
    [&_[data-slot=datefield]:has(+[data-slot=input-addon])]:[&_[data-slot=input]]:rounded-e-none
    [&_[data-slot=input]:has(+[data-slot=button])]:rounded-e-none
    [&_[data-slot=input]:has(+[data-slot=input-addon])]:rounded-e-none
    [&_[data-slot=datefield]]:grow
    [&_[data-slot=datefield]+[data-slot=input-addon]]:rounded-s-none [&_[data-slot=datefield]+[data-slot=input-addon]]:border-s-0
  `,{variants:{},defaultVariants:{}}),n=(0,s.cva)(`
    flex items-center gap-1.5
    has-[:focus-visible]:ring-ring/30 
    has-[:focus-visible]:border-ring
    has-[:focus-visible]:outline-none 
    has-[:focus-visible]:ring-[3px]

    [&_[data-slot=datefield]]:grow 
    [&_[data-slot=input]]:data-focus-within:ring-transparent  
    [&_[data-slot=input]]:data-focus-within:ring-0 
    [&_[data-slot=input]]:data-focus-within:border-0 
    [&_[data-slot=input]]:flex 
    [&_[data-slot=input]]:w-full 
    [&_[data-slot=input]]:outline-none 
    [&_[data-slot=input]]:transition-colors 
    [&_[data-slot=input]]:text-foreground
    [&_[data-slot=input]]:placeholder:text-muted-foreground 
    [&_[data-slot=input]]:border-0 
    [&_[data-slot=input]]:bg-transparent 
    [&_[data-slot=input]]:p-0
    [&_[data-slot=input]]:shadow-none 
    [&_[data-slot=input]]:focus-visible:ring-0 
    [&_[data-slot=input]]:h-auto 
    [&_[data-slot=input]]:disabled:cursor-not-allowed
    [&_[data-slot=input]]:disabled:opacity-50    

    [&_svg]:text-muted-foreground 
    [&_svg]:shrink-0
  `,{variants:{variant:{sm:"gap-1.25 [&_svg:not([class*=size-])]:size-3.5",md:"gap-1.5 [&_svg:not([class*=size-])]:size-4",lg:"gap-1.5 [&_svg:not([class*=size-])]:size-4"}},defaultVariants:{variant:"md"}});function d({className:e,type:s,variant:i,...o}){return(0,t.jsx)("input",{"data-slot":"input",type:s,className:(0,a.cn)(r({variant:i}),e),...o})}function l({className:e,variant:s,mode:r,...o}){return(0,t.jsx)("div",{"data-slot":"input-addon",className:(0,a.cn)(i({variant:s,mode:r}),e),...o})}function u({className:e,...s}){return(0,t.jsx)("div",{"data-slot":"input-group",className:(0,a.cn)(o(),e),...s})}function c({className:e,variant:s,...i}){return(0,t.jsx)("div",{"data-slot":"input-wrapper",className:(0,a.cn)(r({variant:s}),n({variant:s}),e),...i})}e.s(["Input",()=>d,"InputAddon",()=>l,"InputGroup",()=>u,"InputWrapper",()=>c,"inputVariants",()=>r])},10708,973741,e=>{"use strict";var t=e.i(843476),a=e.i(647163),s=e.i(225913),r=e.i(271645);e.i(174080);var i=e.i(991918),o=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","select","span","svg","ul"].reduce((e,a)=>{let s=(0,i.createSlot)(`Primitive.${a}`),o=r.forwardRef((e,r)=>{let{asChild:i,...o}=e;return"u">typeof window&&(window[Symbol.for("radix-ui")]=!0),(0,t.jsx)(i?s:a,{...o,ref:r})});return o.displayName=`Primitive.${a}`,{...e,[a]:o}},{}),n=r.forwardRef((e,a)=>(0,t.jsx)(o.label,{...e,ref:a,onMouseDown:t=>{t.target.closest("button, input, select, textarea")||(e.onMouseDown?.(t),!t.defaultPrevented&&t.detail>1&&t.preventDefault())}}));n.displayName="Label",e.s(["Label",()=>n,"Root",()=>n],973741);var d=e.i(973741),d=d;let l=(0,s.cva)("text-sm leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-50",{variants:{variant:{primary:"font-medium",secondary:"font-normal"}},defaultVariants:{variant:"primary"}});function u({className:e,variant:s,...r}){return(0,t.jsx)(d.Root,{"data-slot":"label",className:(0,a.cn)(l({variant:s}),e),...r})}e.s(["Label",()=>u],10708)},848886,e=>{"use strict";let t=(0,e.i(475254).default)("loader-circle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);e.s(["LoaderCircleIcon",()=>t],848886)},77705,e=>{"use strict";let t=(0,e.i(475254).default)("eye-off",[["path",{d:"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",key:"ct8e1f"}],["path",{d:"M14.084 14.158a3 3 0 0 1-4.242-4.242",key:"151rxh"}],["path",{d:"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",key:"13bj9a"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]]);e.s(["EyeOff",()=>t],77705)},208076,e=>{"use strict";var t=e.i(843476),a=e.i(271645),s=e.i(522016),r=e.i(618566),i=e.i(994814),o=e.i(63209),n=e.i(286536),d=e.i(77705),l=e.i(217255),u=e.i(653145),c=e.i(781947),p=e.i(167881),m=e.i(874946),f=e.i(23750),x=e.i(848886),g=e.i(50270);function h(){let e=(0,r.useRouter)(),[h,b]=(0,a.useState)(!1),[v,y]=(0,a.useState)(!1),[w,_]=(0,a.useState)(null),j=(0,u.useForm)({resolver:(0,i.zodResolver)(g.z.object({email:g.z.string().email({message:"Please enter a valid email address."}).min(1,{message:"Email is required."}),password:g.z.string().min(6,{message:"Password must be at least 6 characters long."}).min(1,{message:"Password is required."}),rememberMe:g.z.boolean().optional()})),defaultValues:{email:"",password:"",rememberMe:!1}});async function z(t){y(!0),_(null);try{let a=await (0,l.signIn)("credentials",{redirect:!1,email:t.email,password:t.password});if(a?.error)try{let e=JSON.parse(a.error);if(e.redirectUrl){window.location.href=e.redirectUrl;return}_(e.message)}catch{_(a.error)}else e.push("/")}catch(e){_(e instanceof Error?e.message:"An unexpected error occurred. Please try again.")}finally{y(!1)}}return(0,t.jsx)(m.Form,{...j,children:(0,t.jsxs)("form",{onSubmit:j.handleSubmit(z),className:"block w-full space-y-5",children:[(0,t.jsx)("div",{className:"space-y-1.5 pb-3",children:(0,t.jsx)("h1",{className:"text-2xl font-semibold tracking-tight text-center",children:"Sign in to Ordrat"})}),w&&(0,t.jsxs)(c.Alert,{variant:"destructive",children:[(0,t.jsx)(c.AlertIcon,{children:(0,t.jsx)(o.AlertCircle,{})}),(0,t.jsx)(c.AlertTitle,{children:w})]}),(0,t.jsx)(m.FormField,{control:j.control,name:"email",render:({field:e})=>(0,t.jsxs)(m.FormItem,{children:[(0,t.jsx)(m.FormLabel,{children:"Email"}),(0,t.jsx)(m.FormControl,{children:(0,t.jsx)(f.Input,{placeholder:"Your email",...e})}),(0,t.jsx)(m.FormMessage,{})]})}),(0,t.jsx)(m.FormField,{control:j.control,name:"password",render:({field:e})=>(0,t.jsxs)(m.FormItem,{children:[(0,t.jsxs)("div",{className:"flex justify-between items-center gap-2.5",children:[(0,t.jsx)(m.FormLabel,{children:"Password"}),(0,t.jsx)(s.default,{href:"/reset-password",className:"text-sm font-semibold text-foreground hover:text-primary",children:"Forgot Password?"})]}),(0,t.jsxs)("div",{className:"relative",children:[(0,t.jsx)(f.Input,{placeholder:"Your password",type:h?"text":"password",...e}),(0,t.jsx)(p.Button,{type:"button",variant:"ghost",mode:"icon",size:"sm",onClick:()=>b(!h),className:"absolute end-0 top-1/2 -translate-y-1/2 h-7 w-7 me-1.5 bg-transparent!","aria-label":h?"Hide password":"Show password",children:h?(0,t.jsx)(d.EyeOff,{className:"text-muted-foreground"}):(0,t.jsx)(n.Eye,{className:"text-muted-foreground"})})]}),(0,t.jsx)(m.FormMessage,{})]})}),(0,t.jsx)("div",{className:"flex flex-col gap-2.5",children:(0,t.jsxs)(p.Button,{type:"submit",disabled:v,children:[v?(0,t.jsx)(x.LoaderCircleIcon,{className:"size-4 animate-spin"}):null,"Continue"]})})]})})}e.s(["default",()=>h],208076)}]);