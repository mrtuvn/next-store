# Class Variance Authority (CVA) Implementation

## ✅ Why CVA is Better for Class Merging

**Problem with manual object approach:**
```tsx
// OLD WAY - Manual objects
const variants = {
  primary: 'bg-primary-600...',
  secondary: 'bg-gray-600...'
};
const sizes = {
  md: 'px-4 h-10'
};

className={cn(baseStyles, variants[variant], sizes[size], className)}
// Issue: Class order matters, merge conflicts can occur
```

**Solution with CVA:**
```tsx
// NEW WAY - CVA handles variants properly
const buttonVariants = cva(
  'base-styles',
  {
    variants: {
      variant: { primary: '...', secondary: '...' },
      size: { sm: '...', md: '...', lg: '...' }
    },
    defaultVariants: { variant: 'primary', size: 'md' }
  }
);

className={cn(buttonVariants({ variant, size }), className)}
// ✅ Better: CVA + tailwind-merge work together perfectly
```

## 🎯 Benefits of CVA

### 1. **Proper Variant Management**
- Type-safe variants
- Default variants
- Compound variants (future feature)

### 2. **Better Class Merging**
- CVA generates classes in predictable order
- `tailwind-merge` can properly override conflicting classes
- Latest className wins as expected

### 3. **TypeScript Integration**
```tsx
// Automatic type inference
type ButtonVariants = VariantProps<typeof buttonVariants>;

// Full autocomplete support
<Button variant="primary" size="lg" />
//      ^^^^^^^            ^^^^
//      Autocomplete!      Autocomplete!
```

### 4. **Cleaner Code**
- No manual objects for variants
- No manual size mappings
- Variants co-located with component

## 🔧 How It Works

### Step 1: CVA Creates Base Classes
```tsx
buttonVariants({ variant: 'primary', size: 'md' })
// Returns: 'inline-flex items-center ... bg-primary-600 ... px-4 h-10 ...'
```

### Step 2: cn() Merges with Custom Classes
```tsx
cn(
  buttonVariants({ variant: 'primary', size: 'md' }), // px-4 h-10
  'p-6' // User custom class
)
// Returns: 'inline-flex items-center ... bg-primary-600 ... p-6 h-10'
//          px-4 removed, p-6 added ✅
```

### Step 3: tailwind-merge Handles Conflicts
```tsx
// CVA output:    'px-4 h-10'
// User class:    'p-6'
// Final result:  'h-10 p-6' ✅
//                px-4 removed (overridden)
//                p-6 wins (latest)
```

## 📊 Before vs After

### BEFORE (Manual Objects)
```tsx
const Button = ({ variant, size, className }) => {
  const variants = {
    primary: 'bg-primary-600 text-white',
    secondary: 'bg-gray-600 text-white'
  };
  
  const sizes = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-base',
    lg: 'h-12 px-6 text-lg'
  };

  return (
    <button 
      className={cn(
        'inline-flex items-center',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </button>
  );
};

// Issues:
// ❌ Manual type checking needed
// ❌ No default variants
// ❌ Verbose object definitions
// ❌ Less predictable class order
```

### AFTER (CVA)
```tsx
const buttonVariants = cva(
  'inline-flex items-center justify-center font-medium rounded-lg',
  {
    variants: {
      variant: {
        primary: 'bg-primary-600 text-white hover:bg-primary-700',
        secondary: 'bg-gray-600 text-white hover:bg-gray-700',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-base',
        lg: 'h-12 px-6 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);

// Benefits:
// ✅ Automatic TypeScript types
// ✅ Default variants built-in
// ✅ Clean, declarative syntax
// ✅ Predictable class generation
// ✅ Perfect with tailwind-merge
```

## 🧪 Testing Class Override

### Test 1: p-6 overrides px-4
```tsx
<Button size="md" className="p-6">
  Test
</Button>

// CVA generates: 'inline-flex ... px-4 h-10 ...'
// User passes:   'p-6'
// Final result:  'inline-flex ... h-10 p-6' ✅
//                px-4 removed, p-6 applied
```

### Test 2: px-6 overrides px-4
```tsx
<Button size="md" className="px-6">
  Test
</Button>

// CVA generates: 'inline-flex ... px-4 h-10 ...'
// User passes:   'px-6'
// Final result:  'inline-flex ... h-10 px-6' ✅
//                px-4 removed, px-6 applied
```

### Test 3: py-4 doesn't conflict
```tsx
<Button size="md" className="py-4">
  Test
</Button>

// CVA generates: 'inline-flex ... px-4 h-10 ...'
// User passes:   'py-4'
// Final result:  'inline-flex ... px-4 py-4 h-10' ✅
//                px-4 kept (no conflict)
//                py-4 added
```

## 🎨 Advanced Features

### Compound Variants (Future Use)
```tsx
const buttonVariants = cva(
  'base-styles',
  {
    variants: {
      variant: { primary: '...', secondary: '...' },
      size: { sm: '...', md: '...', lg: '...' },
    },
    compoundVariants: [
      {
        variant: 'primary',
        size: 'lg',
        class: 'text-xl font-bold', // Extra styles for this combo
      },
    ],
  }
);
```

### Multiple Variants
```tsx
<Button 
  variant="primary" 
  size="lg" 
  fullWidth 
  className="shadow-xl"
>
  Submit
</Button>

// All variants properly merged!
```

## 📋 Migration Checklist

- [x] Install `class-variance-authority`
- [x] Refactor Button component to use CVA
- [x] Export buttonVariants for reuse
- [x] Add TypeScript types via VariantProps
- [x] Test class merging (p-6 overrides px-4)
- [ ] Migrate other components (Input, Select, etc.)
- [ ] Update Storybook stories (if applicable)

## 🚀 Usage Examples

### Basic Button
```tsx
<Button>Click Me</Button>
// Uses default: variant="primary" size="md"
```

### With Variants
```tsx
<Button variant="secondary" size="lg">
  Large Secondary
</Button>
```

### With Custom Classes
```tsx
<Button className="p-6 shadow-2xl">
  Custom Padding & Shadow
</Button>
// p-6 overrides default px-4 ✅
```

### Full Width
```tsx
<Button fullWidth>
  Full Width Button
</Button>
```

### Loading State
```tsx
<Button isLoading>
  Processing...
</Button>
```

## 🎯 Key Takeaways

1. **CVA** = Better variant management
2. **tailwind-merge** = Proper class conflict resolution
3. **Together** = Perfect class merging where latest wins
4. **TypeScript** = Full type safety and autocomplete
5. **DX** = Much better developer experience

## ✅ Result

**Your `className="p-6"` will now properly override `px-4` from `size="md"`!**

The combination of CVA + tailwind-merge ensures:
- ✅ Classes generated in predictable order
- ✅ Conflicts properly detected
- ✅ Latest class always wins
- ✅ No manual variant management
- ✅ Full TypeScript support

---

**Status:** ✅ Implemented  
**Package:** class-variance-authority@0.7.0  
**Result:** Perfect class merging with latest value winning

