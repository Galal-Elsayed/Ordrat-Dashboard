(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,10708,973741,t=>{"use strict";var e=t.i(843476),a=t.i(647163),i=t.i(225913),n=t.i(271645);t.i(174080);var s=t.i(991918),o=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","select","span","svg","ul"].reduce((t,a)=>{let i=(0,s.createSlot)(`Primitive.${a}`),o=n.forwardRef((t,n)=>{let{asChild:s,...o}=t;return"u">typeof window&&(window[Symbol.for("radix-ui")]=!0),(0,e.jsx)(s?i:a,{...o,ref:n})});return o.displayName=`Primitive.${a}`,{...t,[a]:o}},{}),l=n.forwardRef((t,a)=>(0,e.jsx)(o.label,{...t,ref:a,onMouseDown:e=>{e.target.closest("button, input, select, textarea")||(t.onMouseDown?.(e),!e.defaultPrevented&&e.detail>1&&e.preventDefault())}}));l.displayName="Label",t.s(["Label",()=>l,"Root",()=>l],973741);var d=t.i(973741),d=d;let r=(0,i.cva)("text-sm leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-50",{variants:{variant:{primary:"font-medium",secondary:"font-normal"}},defaultVariants:{variant:"primary"}});function u({className:t,variant:i,...n}){return(0,e.jsx)(d.Root,{"data-slot":"label",className:(0,a.cn)(r({variant:i}),t),...n})}t.s(["Label",()=>u],10708)},618566,(t,e,a)=>{e.exports=t.r(976562)},63209,361653,t=>{"use strict";let e=(0,t.i(475254).default)("circle-alert",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]);t.s(["default",()=>e],361653),t.s(["AlertCircle",()=>e],63209)},23750,t=>{"use strict";var e=t.i(843476),a=t.i(647163),i=t.i(225913);let n=(0,i.cva)(`
    flex w-full bg-background border border-input shadow-xs shadow-black/5 transition-[color,box-shadow] text-foreground placeholder:text-muted-foreground/80 
    focus-visible:ring-ring/30  focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px]     
    disabled:cursor-not-allowed disabled:opacity-60 
    [&[readonly]]:bg-muted/80 [&[readonly]]:cursor-not-allowed
    file:h-full [&[type=file]]:py-0 file:border-solid file:border-input file:bg-transparent 
    file:font-medium file:not-italic file:text-foreground file:p-0 file:border-0 file:border-e
    aria-invalid:border-destructive/60 aria-invalid:ring-destructive/10 dark:aria-invalid:border-destructive dark:aria-invalid:ring-destructive/20
  `,{variants:{variant:{lg:"h-10 px-4 text-sm rounded-md file:pe-4 file:me-4",md:"h-8.5 px-3 text-[0.8125rem] leading-(--text-sm--line-height) rounded-md file:pe-3 file:me-3",sm:"h-7 px-2.5 text-xs rounded-md file:pe-2.5 file:me-2.5"}},defaultVariants:{variant:"md"}}),s=(0,i.cva)("flex items-center shrink-0 justify-center bg-muted border border-input shadow-xs shadow-[rgba(0,0,0,0.05)] text-secondary-foreground [&_svg]:text-secondary-foreground/60",{variants:{variant:{sm:"rounded-md h-7 min-w-7 text-xs px-2.5 [&_svg:not([class*=size-])]:size-3.5",md:"rounded-md h-8.5 min-w-8.5 px-3 text-[0.8125rem] leading-(--text-sm--line-height) [&_svg:not([class*=size-])]:size-4.5",lg:"rounded-md h-10 min-w-10 px-4 text-sm [&_svg:not([class*=size-])]:size-4.5"},mode:{default:"",icon:"px-0 justify-center"}},defaultVariants:{variant:"md",mode:"default"}}),o=(0,i.cva)(`
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
  `,{variants:{},defaultVariants:{}}),l=(0,i.cva)(`
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
  `,{variants:{variant:{sm:"gap-1.25 [&_svg:not([class*=size-])]:size-3.5",md:"gap-1.5 [&_svg:not([class*=size-])]:size-4",lg:"gap-1.5 [&_svg:not([class*=size-])]:size-4"}},defaultVariants:{variant:"md"}});function d({className:t,type:i,variant:s,...o}){return(0,e.jsx)("input",{"data-slot":"input",type:i,className:(0,a.cn)(n({variant:s}),t),...o})}function r({className:t,variant:i,mode:n,...o}){return(0,e.jsx)("div",{"data-slot":"input-addon",className:(0,a.cn)(s({variant:i,mode:n}),t),...o})}function u({className:t,...i}){return(0,e.jsx)("div",{"data-slot":"input-group",className:(0,a.cn)(o(),t),...i})}function c({className:t,variant:i,...s}){return(0,e.jsx)("div",{"data-slot":"input-wrapper",className:(0,a.cn)(n({variant:i}),l({variant:i}),t),...s})}t.s(["Input",()=>d,"InputAddon",()=>r,"InputGroup",()=>u,"InputWrapper",()=>c,"inputVariants",()=>n])},871689,t=>{"use strict";let e=(0,t.i(475254).default)("arrow-left",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);t.s(["ArrowLeft",()=>e],871689)},848886,t=>{"use strict";let e=(0,t.i(475254).default)("loader-circle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);t.s(["LoaderCircleIcon",()=>e],848886)},380176,t=>{"use strict";var e=t.i(843476),a=t.i(271645),i=t.i(522016),n=t.i(618566),s=t.i(994814),o=t.i(63209),l=t.i(871689),d=t.i(643531),r=t.i(653145),u=t.i(50270),c=t.i(781947),p=t.i(167881),f=t.i(874946),m=t.i(23750),x=t.i(848886);let h=u.z.object({email:u.z.string().email({message:"Please enter a valid email address."})});function g(){let t=(0,n.useRouter)(),[u,g]=(0,a.useState)(null),[b,v]=(0,a.useState)(!1),[y,_]=(0,a.useState)(null),w=(0,r.useForm)({resolver:(0,s.zodResolver)(h),defaultValues:{email:""}});async function j(e){v(!0),g(null),_(null);try{let a=await fetch("https://testapi.ordrat.com/api/Auth/ForgetPassword",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e.email})});if(!a.ok){let t=await a.json().catch(()=>({}));g(t.message??"Something went wrong. Please try again.");return}localStorage.setItem("ValidationEmail",e.email),_("Check your inbox — a verification code has been sent."),w.reset(),setTimeout(()=>t.push("/verify-otp"),1500)}catch{g("Service unavailable. Please try again later.")}finally{v(!1)}}return(0,e.jsx)(f.Form,{...w,children:(0,e.jsxs)("form",{onSubmit:w.handleSubmit(j),className:"block w-full space-y-5",children:[(0,e.jsxs)("div",{className:"text-center space-y-1 pb-3",children:[(0,e.jsx)("h1",{className:"text-2xl font-semibold tracking-tight",children:"Reset Password"}),(0,e.jsx)("p",{className:"text-sm text-muted-foreground",children:"Enter your email to receive a verification code."})]}),u&&(0,e.jsxs)(c.Alert,{variant:"destructive",onClose:()=>g(null),children:[(0,e.jsx)(c.AlertIcon,{children:(0,e.jsx)(o.AlertCircle,{})}),(0,e.jsx)(c.AlertTitle,{children:u})]}),y&&(0,e.jsxs)(c.Alert,{onClose:()=>_(null),children:[(0,e.jsx)(c.AlertIcon,{children:(0,e.jsx)(d.Check,{})}),(0,e.jsx)(c.AlertTitle,{children:y})]}),(0,e.jsx)(f.FormField,{control:w.control,name:"email",render:({field:t})=>(0,e.jsxs)(f.FormItem,{children:[(0,e.jsx)(f.FormLabel,{children:"Email"}),(0,e.jsx)(f.FormControl,{children:(0,e.jsx)(m.Input,{type:"email",placeholder:"Enter your email address",disabled:!!y||b,...t})}),(0,e.jsx)(f.FormMessage,{})]})}),(0,e.jsxs)(p.Button,{type:"submit",disabled:!!y||b,className:"w-full",children:[b?(0,e.jsx)(x.LoaderCircleIcon,{className:"size-4 animate-spin"}):null,"Submit"]}),(0,e.jsx)(p.Button,{type:"button",variant:"outline",className:"w-full",asChild:!0,children:(0,e.jsxs)(i.default,{href:"/signin",children:[(0,e.jsx)(l.ArrowLeft,{className:"size-3.5"})," Back"]})})]})})}t.s(["default",()=>g])}]);