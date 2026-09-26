# Phase 2: Core Patterns (Weeks 3–5)

## The Goal

Phase 1 gave you fluency with linear data structures and single-pass techniques. Phase 2 introduces **non-linear thinking**: halving search spaces (binary search), managing nested structure (stacks), pointer manipulation (linked lists), recursive decomposition (trees), and exploring connectivity (graphs). These patterns form the backbone of medium-difficulty interview problems.

---

---

## Topic 1: Binary Search

### Why This Matters

Binary search is far more than "find a number in a sorted array." It's a **general-purpose technique for eliminating half the search space** at each step. Once you internalize the generalized version, you'll start seeing binary search opportunities everywhere — including problems that don't mention sorting at all.

### Core Concepts to Master

**1. Classic binary search:** Find a target in a sorted array.

**2. Boundary search:** Find the **first** or **last** position where a condition changes (leftmost true, rightmost true).

**3. Binary search on answer:** The answer itself lies in a numeric range, and you binary search over possible answers, checking feasibility.

**4. Search in modified sorted structures:** Rotated arrays, matrices, etc.

### The Three Templates You Need

**Template A: Exact Match**
```typescript
function binarySearchExact(nums: number[], target: number): number {
    let lo = 0;
    let hi = nums.length - 1;

    while (lo <= hi) {
        const mid = lo + Math.floor((hi - lo) / 2); // avoids overflow
        if (nums[mid] === target) {
            return mid;
        } else if (nums[mid] < target) {
            lo = mid + 1;
        } else {
            hi = mid - 1;
        }
    }

    return -1; // not found
}
```

**Template B: Leftmost / First True — THE MOST IMPORTANT ONE**
```typescript
// Find the smallest index where condition(mid) is true.
// Precondition: condition is false for some prefix, then true for the rest
// [false, false, false, true, true, true]
//                        ^ we want this index
function firstTrue(
    lo: number,
    hi: number,
    condition: (mid: number) => boolean
): number {
    while (lo < hi) {
        const mid = lo + Math.floor((hi - lo) / 2);
        if (condition(mid)) {
            hi = mid;       // mid could be the answer, search left
        } else {
            lo = mid + 1;   // mid is definitely not the answer
        }
    }
    return lo; // lo === hi, this is the boundary
}
```

**Template C: Rightmost / Last True**
```typescript
// Find the largest index where condition(mid) is true.
// [true, true, true, false, false, false]
//              ^ we want this index
function lastTrue(
    lo: number,
    hi: number,
    condition: (mid: number) => boolean
): number {
    while (lo < hi) {
        const mid = lo + Math.floor((hi - lo + 1) / 2); // ceiling division
        if (condition(mid)) {
            lo = mid;       // mid could be the answer, search right
        } else {
            hi = mid - 1;   // mid is definitely not the answer
        }
    }
    return lo;
}
```

**Why ceiling division in Template C?**
Without `+1`, when `lo + 1 === hi` and `condition(mid)` is true, `mid` would equal `lo`, setting `lo = mid = lo` — an infinite loop. The ceiling prevents this.

### The Golden Rule
> **If you can phrase a problem as "find the smallest x such that f(x) is true" where f is monotonic (once true, always true for all values above x), use binary search.**

---

### Problem 1.1: Binary Search
**LeetCode #704 — Easy**

> Given a sorted array, find the index of a target value.

```typescript
function search(nums: number[], target: number): number {
    let lo = 0;
    let hi = nums.length - 1;

    while (lo <= hi) {
        const mid = lo + Math.floor((hi - lo) / 2);

        if (nums[mid] === target) {
            return mid;
        } else if (nums[mid] < target) {
            lo = mid + 1;
        } else {
            hi = mid - 1;
        }
    }

    return -1;
}
```

**Common mistakes:**
- Using `(lo + hi) / 2` — can overflow in other languages (use `lo + (hi - lo) / 2`)
- Using `lo < hi` with Template A — misses the case where `lo === hi` is the answer
- Off-by-one errors with `mid + 1` vs `mid` vs `mid - 1`

---

### Problem 1.2: First Bad Version
**LeetCode #278 — Easy**

> Versions 1 to n. One is bad, and all versions after it are bad. Find the first bad version. You have an API `isBadVersion(version)`.

**Why this problem:** The purest "first true" binary search. No array — just a monotonic condition function.

```typescript
function solution(isBadVersion: (version: number) => boolean) {
    return function (n: number): number {
        let lo = 1;
        let hi = n;

        while (lo < hi) {
            const mid = lo + Math.floor((hi - lo) / 2);

            if (isBadVersion(mid)) {
                hi = mid;       // mid might be the first bad, search left
            } else {
                lo = mid + 1;   // mid is good, first bad is to the right
            }
        }

        return lo; // lo === hi === first bad version
    };
}
```

**Dry run:**
```
n = 8, first bad = 5
[good, good, good, good, BAD, BAD, BAD, BAD]
  1     2     3     4     5    6    7    8

lo=1, hi=8 → mid=4: good → lo=5
lo=5, hi=8 → mid=6: bad  → hi=6
lo=5, hi=6 → mid=5: bad  → hi=5
lo=5 === hi=5 → return 5 ✓
```

---

### Problem 1.3: Search Insert Position
**LeetCode #35 — Easy**

> Find the index where target would be inserted into a sorted array (equivalent to `bisect_left`).

```typescript
function searchInsert(nums: number[], target: number): number {
    let lo = 0;
    let hi = nums.length; // can insert AFTER the last element

    while (lo < hi) {
        const mid = lo + Math.floor((hi - lo) / 2);

        if (nums[mid] >= target) {
            hi = mid;
        } else {
            lo = mid + 1;
        }
    }

    return lo;
}
```

This is "first true" where the condition is `nums[mid] >= target`. The search finds the leftmost index where the value is ≥ target — exactly where target should be inserted.

---

### Problem 1.4: Find First and Last Position of Element in Sorted Array
**LeetCode #34 — Medium**

> Given a sorted array with duplicates, find the starting and ending position of a target value.

**Why this problem:** Directly applies "first true" twice with different conditions.

```typescript
function searchRange(nums: number[], target: number): number[] {
    if (nums.length === 0) return [-1, -1];

    const first = bisectLeft(nums, target);
    const last = bisectLeft(nums, target + 1) - 1;

    // Verify the target actually exists
    if (first < nums.length && nums[first] === target) {
        return [first, last];
    }
    return [-1, -1];
}

// Finds the leftmost index where nums[index] >= target
function bisectLeft(nums: number[], target: number): number {
    let lo = 0;
    let hi = nums.length;

    while (lo < hi) {
        const mid = lo + Math.floor((hi - lo) / 2);
        if (nums[mid] >= target) {
            hi = mid;
        } else {
            lo = mid + 1;
        }
    }
    return lo;
}
```

**The trick:** `bisectLeft(target)` gives the first occurrence. `bisectLeft(target + 1) - 1` gives the last occurrence. This two-call pattern avoids writing separate "find first" and "find last" functions.

**Dry run:**
```
nums = [5, 7, 7, 8, 8, 10], target = 8

bisectLeft(8):
  lo=0, hi=6 → mid=3: nums[3]=8 >= 8 → hi=3
  lo=0, hi=3 → mid=1: nums[1]=7 < 8  → lo=2
  lo=2, hi=3 → mid=2: nums[2]=7 < 8  → lo=3
  lo=3 === hi=3 → return 3 (first 8)

bisectLeft(9):
  lo=0, hi=6 → mid=3: nums[3]=8 < 9  → lo=4
  lo=4, hi=6 → mid=5: nums[5]=10 >= 9 → hi=5
  lo=4, hi=5 → mid=4: nums[4]=8 < 9  → lo=5
  lo=5 === hi=5 → return 5, minus 1 = 4 (last 8)

Result: [3, 4] ✓
```

---

### Problem 1.5: Search in Rotated Sorted Array
**LeetCode #33 — Medium**

> Search for a target in a rotated sorted array (e.g., `[4,5,6,7,0,1,2]`).

**Why this problem:** One of the most frequently asked medium binary search problems. Forces you to determine which half is sorted.

**Key insight:** At any `mid`, one of the two halves `[lo..mid]` or `[mid..hi]` must be properly sorted. Identify which one, check if target falls in that sorted range, and eliminate the other half.

```typescript
function search(nums: number[], target: number): number {
    let lo = 0;
    let hi = nums.length - 1;

    while (lo <= hi) {
        const mid = lo + Math.floor((hi - lo) / 2);

        if (nums[mid] === target) {
            return mid;
        }

        // Determine which half is sorted
        if (nums[lo] <= nums[mid]) {
            // LEFT half [lo..mid] is sorted
            if (nums[lo] <= target && target < nums[mid]) {
                hi = mid - 1; // target is in sorted left half
            } else {
                lo = mid + 1; // target is in right half
            }
        } else {
            // RIGHT half [mid..hi] is sorted
            if (nums[mid] < target && target <= nums[hi]) {
                lo = mid + 1; // target is in sorted right half
            } else {
                hi = mid - 1; // target is in left half
            }
        }
    }

    return -1;
}
```

**Dry run:**
```
nums = [4, 5, 6, 7, 0, 1, 2], target = 0

lo=0, hi=6 → mid=3, nums[3]=7
  nums[0]=4 <= 7 → left [4,5,6,7] is sorted
  Is 4 <= 0 < 7? No → lo=4

lo=4, hi=6 → mid=5, nums[5]=1
  nums[4]=0 <= 1 → left [0,1] is sorted
  Is 0 <= 0 < 1? Yes → hi=4

lo=4, hi=4 → mid=4, nums[4]=0 === target → return 4 ✓
```

---

### Problem 1.6: Koko Eating Bananas — Binary Search on Answer
**LeetCode #875 — Medium**

> Koko has `piles` of bananas and `h` hours. She picks a speed `k` (bananas per hour). Each hour she eats `k` bananas from one pile (if fewer remain, she finishes and waits). Find the minimum `k` so she finishes in `h` hours.

**Why this problem:** The canonical "binary search on answer" problem. You're not searching an array — you're searching over all possible speeds.

**Monotonic condition:** If speed `k` works, any speed `> k` also works. If speed `k` doesn't work, no speed `< k` works. This monotonicity is what makes binary search applicable.

```typescript
function minEatingSpeed(piles: number[], h: number): number {
    let lo = 1;
    let hi = Math.max(...piles);

    while (lo < hi) {
        const mid = lo + Math.floor((hi - lo) / 2);

        if (canFinish(piles, mid, h)) {
            hi = mid;       // this speed works, try slower
        } else {
            lo = mid + 1;   // too slow, must eat faster
        }
    }

    return lo;
}

function canFinish(piles: number[], speed: number, hours: number): boolean {
    let totalHours = 0;

    for (const pile of piles) {
        totalHours += Math.ceil(pile / speed);
        if (totalHours > hours) return false; // early exit
    }

    return true;
}
```

**Dry run:**
```
piles = [3, 6, 7, 11], h = 8

lo=1, hi=11

mid=6: ceil(3/6)+ceil(6/6)+ceil(7/6)+ceil(11/6) = 1+1+2+2 = 6 ≤ 8 → hi=6
mid=3: 1+2+3+4 = 10 > 8 → lo=4
mid=5: 1+2+2+3 = 8 ≤ 8 → hi=5
mid=4: 1+2+2+3 = 8 ≤ 8 → hi=4

lo=4 === hi=4 → return 4 ✓
```

### Binary Search on Answer — The General Template

```
1. Identify: "Find the minimum/maximum VALUE such that some condition holds"
2. Define the search space: [MINIMUM_POSSIBLE, MAXIMUM_POSSIBLE]
3. Write a feasibility check function: canAchieve(value) → boolean
4. Verify monotonicity: if canAchieve(x) then canAchieve(x+1) (or vice versa)
5. Binary search using "first true" or "last true" template
```

---

### Problem 1.7: Find Minimum in Rotated Sorted Array
**LeetCode #153 — Medium**

```typescript
function findMin(nums: number[]): number {
    let lo = 0;
    let hi = nums.length - 1;

    while (lo < hi) {
        const mid = lo + Math.floor((hi - lo) / 2);

        if (nums[mid] > nums[hi]) {
            // Rotation break is to the right of mid
            lo = mid + 1;
        } else {
            // mid could be the minimum, or min is to the left
            hi = mid;
        }
    }

    return nums[lo];
}
```

**Why compare with `nums[hi]` and not `nums[lo]`?**
Comparing with `nums[lo]` is ambiguous. If `nums[mid] >= nums[lo]`, the left half could be sorted OR the entire remaining array could be sorted. Comparing with `nums[hi]` always gives a definitive answer about where the rotation point lies.

---

### More Binary Search Problems to Practice

| # | Problem | Key Concept |
|---|---|---|
| 374 | Guess Number Higher or Lower | Basic binary search |
| 69 | Sqrt(x) | Binary search on answer |
| 74 | Search a 2D Matrix | Flatten matrix mentally |
| 162 | Find Peak Element | Binary search on unsorted data |
| 981 | Time Based Key-Value Store | Binary search on timestamps |
| 1011 | Capacity To Ship Packages | Binary search on answer |
| 540 | Single Element in Sorted Array | Binary search with parity |

---

---

## Topic 2: Stacks

### Why This Matters

Stacks handle problems with **nested structure**, **matching pairs**, **nearest greater/smaller elements**, and **expression evaluation**. The monotonic stack in particular solves an entire class of problems that would otherwise be O(n²) in O(n).

### Core Concepts to Master

**1. LIFO principle:** Last In, First Out. Most recently added element is processed first.

**2. When a stack is the answer:**
- Matching opening/closing delimiters (parentheses, tags)
- Processing things in reverse order of encounter
- "Remembering" previous state to return to
- Evaluating expressions with nesting/precedence
- "Next greater/smaller element" → monotonic stack

**3. Monotonic Stack:** A stack that maintains elements in sorted order. When a new element would violate the order, pop and process. This connects each element to its "next greater" or "next smaller" in O(n) total.

### Stack in TypeScript
```typescript
// Use an array — push/pop operate on the end (top of stack)
const stack: number[] = [];

stack.push(1);               // push to top
stack.push(2);
stack.push(3);

stack[stack.length - 1];     // peek at top: 3 (no removal)
stack.pop();                 // remove and return top: 3
stack.length;                // size check: 2
stack.length === 0;          // isEmpty check
```

---

### Problem 2.1: Valid Parentheses
**LeetCode #20 — Easy**

> Given a string containing `(){}[]`, determine if the input is valid. Every open bracket must be closed by the same type in the correct order.

**Why this problem:** The quintessential stack problem. Teaches the matching-pairs pattern.

```typescript
function isValid(s: string): boolean {
    const stack: string[] = [];

    // Map each closing bracket to its matching opening bracket
    const matchingBracket: Record<string, string> = {
        ')': '(',
        '}': '{',
        ']': '['
    };

    for (const char of s) {
        if (char === '(' || char === '{' || char === '[') {
            // Opening bracket → push onto stack
            stack.push(char);
        } else {
            // Closing bracket → check if it matches the top of the stack
            if (
                stack.length === 0 ||
                stack[stack.length - 1] !== matchingBracket[char]
            ) {
                return false;
            }
            stack.pop();
        }
    }

    // Valid only if all brackets were matched (stack is empty)
    return stack.length === 0;
}
```

**Dry run:**
```
s = "{[()]}"

'{' → push: stack = ['{']
'[' → push: stack = ['{', '[']
'(' → push: stack = ['{', '[', '(']
')' → top is '(' matches → pop: stack = ['{', '[']
']' → top is '[' matches → pop: stack = ['{']
'}' → top is '{' matches → pop: stack = []

Stack empty → return true ✓
```

---

### Problem 2.2: Min Stack
**LeetCode #155 — Medium**

> Design a stack that supports push, pop, top, and getMin in O(1) time.

**Why this problem:** Teaches the "auxiliary state" pattern — maintaining extra information alongside your primary data structure.

**Key insight:** Use a second stack that tracks the minimum at each level. Whenever you push, also push the current minimum onto the min stack.

```typescript
class MinStack {
    private stack: number[];
    private minStack: number[]; // parallel stack tracking mins

    constructor() {
        this.stack = [];
        this.minStack = [];
    }

    push(val: number): void {
        this.stack.push(val);

        // Push the new minimum: either val itself or the current min
        const currentMin = this.minStack.length === 0
            ? val
            : Math.min(val, this.minStack[this.minStack.length - 1]);
        this.minStack.push(currentMin);
    }

    pop(): void {
        this.stack.pop();
        this.minStack.pop();
    }

    top(): number {
        return this.stack[this.stack.length - 1];
    }

    getMin(): number {
        return this.minStack[this.minStack.length - 1];
    }
}
```

**How the min stack stays in sync:**
```
Operations:        stack       minStack
push(5):          [5]         [5]          min=5
push(3):          [5,3]       [5,3]        min=3
push(7):          [5,3,7]     [5,3,3]      min=3
pop() → 7:        [5,3]       [5,3]        min=3
pop() → 3:        [5]         [5]          min=5
```

---

### Problem 2.3: Evaluate Reverse Polish Notation
**LeetCode #150 — Medium**

> Evaluate an expression in Reverse Polish Notation (postfix). Valid operators: `+`, `-`, `*`, `/`.

**Why this problem:** Classic stack-based expression evaluation. Operands go on the stack; operators pop two operands, compute, and push the result.

```typescript
function evalRPN(tokens: string[]): number {
    const stack: number[] = [];
    const operators = new Set(['+', '-', '*', '/']);

    for (const token of tokens) {
        if (operators.has(token)) {
            // Pop two operands (right first, then left)
            const right = stack.pop()!;
            const left = stack.pop()!;

            let result: number;
            switch (token) {
                case '+': result = left + right; break;
                case '-': result = left - right; break;
                case '*': result = left * right; break;
                case '/': result = Math.trunc(left / right); break; // truncate toward zero
                default: result = 0;
            }

            stack.push(result);
        } else {
            // It's a number — push onto stack
            stack.push(parseInt(token));
        }
    }

    return stack[0];
}
```

**Dry run:**
```
tokens = ["2", "1", "+", "3", "*"]

"2" → push: stack = [2]
"1" → push: stack = [2, 1]
"+" → pop 1, pop 2 → 2+1=3 → push: stack = [3]
"3" → push: stack = [3, 3]
"*" → pop 3, pop 3 → 3*3=9 → push: stack = [9]

Return 9 ✓     (equivalent to (2 + 1) * 3 = 9)
```

---

### Problem 2.4: Daily Temperatures — Monotonic Stack
**LeetCode #739 — Medium**

> Given daily temperatures, for each day find how many days until a warmer temperature. If no future warmer day, output 0.

**Why this problem:** The definitive monotonic stack problem. Every "next greater element" problem uses this same pattern.

**Brute force thinking:** For each day, scan forward to find the next warmer day → O(n²).

**Monotonic stack thinking:** Maintain a stack of days we haven't found an answer for yet. When we encounter a warmer day, it answers all the cooler days sitting on the stack.

```typescript
function dailyTemperatures(temperatures: number[]): number[] {
    const n = temperatures.length;
    const result = new Array(n).fill(0);
    const stack: number[] = []; // stores INDICES, not temperatures

    for (let i = 0; i < n; i++) {
        // While the current temperature is warmer than the temperature
        // at the top of the stack, the current day is the answer for
        // those days on the stack
        while (
            stack.length > 0 &&
            temperatures[i] > temperatures[stack[stack.length - 1]]
        ) {
            const prevDay = stack.pop()!;
            result[prevDay] = i - prevDay;
        }

        // Push the current day — we haven't found its answer yet
        stack.push(i);
    }

    // Any days remaining on the stack never found a warmer day → stays 0

    return result;
}
```

**Dry run:**
```
temperatures = [73, 74, 75, 71, 69, 72, 76, 73]

i=0 (73): stack empty → push 0.  stack=[0]
i=1 (74): 74 > 73 → pop 0, result[0]=1-0=1. stack empty. push 1.  stack=[1]
i=2 (75): 75 > 74 → pop 1, result[1]=2-1=1. stack empty. push 2.  stack=[2]
i=3 (71): 71 < 75 → push 3.  stack=[2,3]
i=4 (69): 69 < 71 → push 4.  stack=[2,3,4]
i=5 (72): 72 > 69 → pop 4, result[4]=5-4=1.
          72 > 71 → pop 3, result[3]=5-3=2.
          72 < 75 → stop. push 5.  stack=[2,5]
i=6 (76): 76 > 72 → pop 5, result[5]=6-5=1.
          76 > 75 → pop 2, result[2]=6-2=4.
          stack empty. push 6.  stack=[6]
i=7 (73): 73 < 76 → push 7.  stack=[6,7]

Days 6, 7 stay on stack → result[6]=0, result[7]=0

result = [1, 1, 4, 2, 1, 1, 0, 0] ✓
```

**Why this is O(n):** Each index is pushed onto the stack exactly once and popped at most once. Total operations across the entire loop: at most 2n.

**The Monotonic Stack Mental Model:**
```
Decreasing monotonic stack (for "next greater"):
  Stack always holds indices in DECREASING order of values.
  When a new value is GREATER, it "resolves" stack entries.

  Great for: next greater element, daily temperatures,
             stock span, largest rectangle in histogram.

Increasing monotonic stack (for "next smaller"):
  Stack always holds indices in INCREASING order of values.
  When a new value is SMALLER, it "resolves" stack entries.

  Great for: next smaller element, trapping rain water.
```

---

### Problem 2.5: Next Greater Element I
**LeetCode #496 — Easy**

> Given `nums1` (subset of `nums2`), find the next greater element in `nums2` for each element in `nums1`.

```typescript
function nextGreaterElement(nums1: number[], nums2: number[]): number[] {
    // Precompute next greater element for every value in nums2
    const nextGreater = new Map<number, number>();
    const stack: number[] = []; // stores values (all unique)

    for (const num of nums2) {
        while (stack.length > 0 && num > stack[stack.length - 1]) {
            const smallerValue = stack.pop()!;
            nextGreater.set(smallerValue, num);
        }
        stack.push(num);
    }

    // Anything left on the stack has no next greater → defaults to -1

    return nums1.map(num => nextGreater.get(num) ?? -1);
}
```

---

### Problem 2.6: Decode String
**LeetCode #394 — Medium**

> Decode `"3[a2[c]]"` → `"accaccacc"`.

**Why this problem:** Stacks handle **nested structure** beautifully. When you see `[`, push current state and start fresh. When you see `]`, pop and combine.

```typescript
function decodeString(s: string): string {
    const countStack: number[] = [];
    const stringStack: string[] = [];
    let currentString = '';
    let currentNum = 0;

    for (const char of s) {
        if (char >= '0' && char <= '9') {
            // Build multi-digit number
            currentNum = currentNum * 10 + parseInt(char);
        } else if (char === '[') {
            // Save current state and start fresh
            countStack.push(currentNum);
            stringStack.push(currentString);
            currentNum = 0;
            currentString = '';
        } else if (char === ']') {
            // Pop: repeat currentString and append to previous string
            const repeatCount = countStack.pop()!;
            const previousString = stringStack.pop()!;
            currentString = previousString + currentString.repeat(repeatCount);
        } else {
            // Regular character
            currentString += char;
        }
    }

    return currentString;
}
```

**Dry run:**
```
s = "3[a2[c]]"

'3' → currentNum=3
'[' → push(3, ""). currentNum=0, currentString=""
'a' → currentString="a"
'2' → currentNum=2
'[' → push(2, "a"). currentNum=0, currentString=""
'c' → currentString="c"
']' → pop count=2, prevStr="a" → "a" + "c".repeat(2) = "acc"
']' → pop count=3, prevStr="" → "" + "acc".repeat(3) = "accaccacc"

Return "accaccacc" ✓
```

---

### More Stack Problems to Practice

| # | Problem | Key Concept |
|---|---|---|
| 232 | Implement Queue using Stacks | Two-stack technique |
| 844 | Backspace String Compare | Stack or reverse traversal |
| 71 | Simplify Path | Stack for path segments |
| 84 | Largest Rectangle in Histogram | Monotonic stack (hard) |
| 853 | Car Fleet | Sort + stack |
| 22 | Generate Parentheses | Backtracking (preview) |
| 42 | Trapping Rain Water | Monotonic stack or two pointers |

---

---

## Topic 3: Linked Lists

### Why This Matters

Linked lists test your ability to **manipulate pointers** and **think about edge cases**. They're less about data structure theory and more about careful implementation. The patterns here (dummy nodes, two pointers, reversal) appear in many interview questions.

### Core Concepts to Master

**1. Node structure:**
```typescript
class ListNode {
    val: number;
    next: ListNode | null;

    constructor(val: number = 0, next: ListNode | null = null) {
        this.val = val;
        this.next = next;
    }
}
```

**2. The Dummy Node Trick:**
Create a fake node before the head. Build your result off `dummy.next`. This eliminates all edge cases related to modifying or creating the head.
```typescript
const dummy = new ListNode(0);
dummy.next = head;
// ... manipulate the list ...
return dummy.next; // the real head of the result
```

**3. The Four Essential Patterns:**
- **Dummy node** — eliminates head edge cases
- **Two pointers (fast/slow)** — find middle, detect cycles, find nth from end
- **In-place reversal** — reverse all or part of a list
- **Merge** — combine two sorted lists

**4. Common pitfalls:**
- Losing reference to the next node before updating pointers
- Forgetting to handle null cases
- Creating cycles accidentally
- Not updating `head` when it changes

---

### Problem 3.1: Reverse Linked List
**LeetCode #206 — Easy**

> Reverse a singly linked list.

**Why this problem:** The single most important linked list technique. Reversal appears as a subroutine in many harder problems.

**The trick:** At each step, you need three pointers: the previous node, the current node, and the next node. Save `next` before overwriting `current.next`.

```typescript
// Iterative approach (preferred in interviews — O(1) space)
function reverseList(head: ListNode | null): ListNode | null {
    let prev: ListNode | null = null;
    let curr: ListNode | null = head;

    while (curr !== null) {
        const next = curr.next; // 1. Save next node
        curr.next = prev;       // 2. Reverse the pointer
        prev = curr;            // 3. Advance prev
        curr = next;            // 4. Advance curr
    }

    return prev; // prev is now the new head
}
```

**Visual:**
```
Before:  1 → 2 → 3 → 4 → null
         c

Step 1:  null ← 1    2 → 3 → 4 → null
         p      c→n

Step 2:  null ← 1 ← 2    3 → 4 → null
                p    c→n

Step 3:  null ← 1 ← 2 ← 3    4 → null
                     p    c→n

Step 4:  null ← 1 ← 2 ← 3 ← 4
                          p    c→null (curr is null, stop)

Return prev (4)
After:   4 → 3 → 2 → 1 → null
```

```typescript
// Recursive approach (elegant but O(n) stack space)
function reverseListRecursive(head: ListNode | null): ListNode | null {
    // Base case: empty list or single node
    if (head === null || head.next === null) {
        return head;
    }

    // Recursively reverse the rest of the list
    const newHead = reverseListRecursive(head.next);

    // head.next is now the LAST node of the reversed sublist
    // Make it point back to head
    head.next.next = head;
    head.next = null;

    return newHead;
}
```

---

### Problem 3.2: Merge Two Sorted Lists
**LeetCode #21 — Easy**

> Merge two sorted linked lists into one sorted list.

**Why this problem:** The merge step from merge sort. Also a building block for "Merge K Sorted Lists."

```typescript
function mergeTwoLists(
    list1: ListNode | null,
    list2: ListNode | null
): ListNode | null {
    // Dummy node eliminates edge cases for the head
    const dummy = new ListNode(0);
    let current = dummy;

    while (list1 !== null && list2 !== null) {
        if (list1.val <= list2.val) {
            current.next = list1;
            list1 = list1.next;
        } else {
            current.next = list2;
            list2 = list2.next;
        }
        current = current.next;
    }

    // Attach whichever list has remaining nodes
    current.next = list1 ?? list2;

    return dummy.next;
}
```

**Dry run:**
```
list1: 1 → 3 → 5
list2: 2 → 4 → 6

dummy → ?

Step 1: 1 < 2 → take 1.  dummy → 1.  list1 at 3.
Step 2: 3 > 2 → take 2.  dummy → 1 → 2.  list2 at 4.
Step 3: 3 < 4 → take 3.  dummy → 1 → 2 → 3.  list1 at 5.
Step 4: 5 > 4 → take 4.  dummy → 1 → 2 → 3 → 4.  list2 at 6.
Step 5: 5 < 6 → take 5.  dummy → 1 → 2 → 3 → 4 → 5.  list1 null.
Attach remaining: → 6.

Result: 1 → 2 → 3 → 4 → 5 → 6 ✓
```

---

### Problem 3.3: Linked List Cycle
**LeetCode #141 — Easy**

> Determine if a linked list has a cycle.

**Why this problem:** Introduces Floyd's Tortoise and Hare algorithm — the fast/slow pointer technique for cycle detection.

**Intuition:** If there's a cycle, a fast pointer (moving 2 steps) will eventually "lap" a slow pointer (moving 1 step) and they'll meet. If there's no cycle, the fast pointer reaches null.

```typescript
function hasCycle(head: ListNode | null): boolean {
    let slow = head;
    let fast = head;

    while (fast !== null && fast.next !== null) {
        slow = slow!.next;          // move 1 step
        fast = fast.next.next;      // move 2 steps

        if (slow === fast) {
            return true; // they met → cycle exists
        }
    }

    // fast reached the end → no cycle
    return false;
}
```

**Why they're guaranteed to meet:**
Once both pointers are in the cycle, the distance between them decreases by 1 each step (fast gains 1 on slow). So they must meet within one full loop of the cycle.

---

### Problem 3.4: Remove Nth Node From End of List
**LeetCode #19 — Medium**

> Remove the nth node from the end of the list in one pass.

**Why this problem:** Two-pointer gap technique. The fast pointer gets a head start of n steps, then both move together. When fast reaches the end, slow is at the target.

```typescript
function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
    const dummy = new ListNode(0, head);
    let fast: ListNode | null = dummy;
    let slow: ListNode | null = dummy;

    // Advance fast pointer n+1 steps ahead
    // (n+1 because we want slow to stop ONE BEFORE the node to remove)
    for (let i = 0; i <= n; i++) {
        fast = fast!.next;
    }

    // Move both until fast reaches the end
    while (fast !== null) {
        slow = slow!.next;
        fast = fast.next;
    }

    // slow is now pointing to the node BEFORE the one we want to remove
    slow!.next = slow!.next!.next;

    return dummy.next;
}
```

**Visual:**
```
Remove 2nd from end:  1 → 2 → 3 → 4 → 5
                      dummy → 1 → 2 → 3 → 4 → 5 → null

After advancing fast 3 steps:
  slow = dummy
  fast = 3

Move together until fast = null:
  slow=1, fast=4
  slow=2, fast=5
  slow=3, fast=null → STOP

slow.next = slow.next.next  →  skip node 4

Result: 1 → 2 → 3 → 5 ✓
```

---

### Problem 3.5: Reorder List
**LeetCode #143 — Medium**

> Reorder `L0 → L1 → ... → Ln` into `L0 → Ln → L1 → Ln-1 → L2 → Ln-2 → ...`

**Why this problem:** Combines THREE linked list techniques: find middle, reverse, merge. This is a common interview problem that tests all your fundamentals.

```typescript
function reorderList(head: ListNode | null): void {
    if (head === null || head.next === null) return;

    // STEP 1: Find the middle using slow/fast pointers
    let slow: ListNode | null = head;
    let fast: ListNode | null = head;

    while (fast!.next !== null && fast!.next.next !== null) {
        slow = slow!.next;
        fast = fast!.next.next;
    }

    // STEP 2: Reverse the second half
    let secondHalf = reverseList(slow!.next);
    slow!.next = null; // cut the list in half

    // STEP 3: Merge the two halves by interleaving
    let firstHalf: ListNode | null = head;

    while (secondHalf !== null) {
        const next1 = firstHalf!.next;
        const next2 = secondHalf.next;

        firstHalf!.next = secondHalf;
        secondHalf.next = next1;

        firstHalf = next1;
        secondHalf = next2;
    }
}

function reverseList(head: ListNode | null): ListNode | null {
    let prev: ListNode | null = null;
    let curr = head;

    while (curr !== null) {
        const next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }

    return prev;
}
```

**Visual:**
```
Input:   1 → 2 → 3 → 4 → 5

Step 1 — Find middle: slow stops at 3
  First half:  1 → 2 → 3
  Second half: 4 → 5

Step 2 — Reverse second half:
  Second half: 5 → 4

Step 3 — Interleave:
  Take 1, then 5 → 1 → 5
  Take 2, then 4 → 1 → 5 → 2 → 4
  Take 3         → 1 → 5 → 2 → 4 → 3

Result: 1 → 5 → 2 → 4 → 3 ✓
```

---

### Problem 3.6: Linked List Cycle II — Find Cycle Start
**LeetCode #142 — Medium**

> If a cycle exists, return the node where the cycle begins.

**Why this problem:** The mathematical extension of Floyd's algorithm. After the fast/slow pointers meet, reset one to head and move both at speed 1 — they'll meet at the cycle start.

```typescript
function detectCycle(head: ListNode | null): ListNode | null {
    let slow = head;
    let fast = head;

    // Phase 1: Detect if cycle exists
    while (fast !== null && fast.next !== null) {
        slow = slow!.next;
        fast = fast.next.next;

        if (slow === fast) {
            // Phase 2: Find the cycle start
            // Reset one pointer to head, keep the other at meeting point
            let pointer = head;

            while (pointer !== slow) {
                pointer = pointer!.next;
                slow = slow!.next;
            }

            return pointer;
        }
    }

    return null; // no cycle
}
```

**Why this works (intuitive proof):**
Let `a` = distance from head to cycle start, `b` = distance from cycle start to meeting point, `c` = cycle length.
- Slow traveled: `a + b`
- Fast traveled: `a + b + nc` (some full loops)
- Fast traveled twice as far: `2(a + b) = a + b + nc` → `a + b = nc` → `a = nc - b`
- So if you start at head (distance `a` from cycle start) and at meeting point (distance `c - b` from cycle start), both reach cycle start at the same time.

---

### More Linked List Problems to Practice

| # | Problem | Key Concept |
|---|---|---|
| 876 | Middle of the Linked List | Fast/slow pointers |
| 234 | Palindrome Linked List | Find middle + reverse + compare |
| 203 | Remove Linked List Elements | Dummy node |
| 328 | Odd Even Linked List | Two-pointer rearrangement |
| 2 | Add Two Numbers | Carry arithmetic |
| 138 | Copy List with Random Pointer | Hash map for node mapping |
| 25 | Reverse Nodes in k-Group | Reverse subroutine (Hard) |

---

---

## Topic 4: Trees

### Why This Matters

Trees are the most commonly tested data structure in coding interviews, especially at top tech companies. Almost every tree problem is solved with **recursion** (DFS), and mastering tree recursion teaches you the recursive thinking needed for dynamic programming and backtracking later.

### Core Concepts to Master

**1. Tree terminology:**
```
        1        ← root (depth 0)
       / \
      2   3      ← depth 1
     / \   \
    4   5   6    ← depth 2 (leaves: 4, 5, 6)

- Height = maximum depth = 2
- Leaf = node with no children
- Binary tree = each node has at most 2 children
- BST = left subtree values < node < right subtree values
```

**2. Tree node structure:**
```typescript
class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;

    constructor(
        val: number = 0,
        left: TreeNode | null = null,
        right: TreeNode | null = null
    ) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}
```

**3. The Two Approaches:**
- **DFS (Depth-First Search):** Go deep before going wide. Uses recursion or explicit stack.
  - Pre-order: process node → left → right
  - In-order: left → process node → right (gives sorted order for BST!)
  - Post-order: left → right → process node
- **BFS (Breadth-First Search):** Go wide before going deep (level by level). Uses a queue.

**4. The Recursive Thinking Pattern for Trees:**
Most tree problems follow this template:
```typescript
function solve(node: TreeNode | null): ResultType {
    // BASE CASE: what to return for an empty tree?
    if (node === null) return BASE_VALUE;

    // RECURSIVE CASE: solve for subtrees
    const leftResult = solve(node.left);
    const rightResult = solve(node.right);

    // COMBINE: use leftResult, rightResult, and node.val
    return combine(leftResult, rightResult, node.val);
}
```

The key questions are:
1. What does my function return?
2. What's the base case (null node)?
3. How do I combine left and right results with the current node?

---

### Problem 4.1: Maximum Depth of Binary Tree
**LeetCode #104 — Easy**

> Find the maximum depth (height) of a binary tree.

**Why this problem:** The simplest tree recursion. It teaches the "ask both children, combine results" pattern.

```typescript
function maxDepth(root: TreeNode | null): number {
    // Base case: empty tree has depth 0
    if (root === null) return 0;

    // Recursive case: depth is 1 + max of children's depths
    const leftDepth = maxDepth(root.left);
    const rightDepth = maxDepth(root.right);

    return 1 + Math.max(leftDepth, rightDepth);
}
```

**Trace for the tree `[3, 9, 20, null, null, 15, 7]`:**
```
        3
       / \
      9  20
        /  \
       15   7

maxDepth(3)
  maxDepth(9)
    maxDepth(null) → 0
    maxDepth(null) → 0
    return 1 + max(0, 0) = 1
  maxDepth(20)
    maxDepth(15)
      return 1 + max(0, 0) = 1
    maxDepth(7)
      return 1 + max(0, 0) = 1
    return 1 + max(1, 1) = 2
  return 1 + max(1, 2) = 3 ✓
```

---

### Problem 4.2: Invert Binary Tree
**LeetCode #226 — Easy**

> Mirror a binary tree (swap left and right children at every node).

```typescript
function invertTree(root: TreeNode | null): TreeNode | null {
    if (root === null) return null;

    // Swap the children
    const temp = root.left;
    root.left = root.right;
    root.right = temp;

    // Recursively invert both subtrees
    invertTree(root.left);
    invertTree(root.right);

    return root;
}

// Even more concise
function invertTreeConcise(root: TreeNode | null): TreeNode | null {
    if (root === null) return null;

    [root.left, root.right] = [
        invertTreeConcise(root.right),
        invertTreeConcise(root.left)
    ];

    return root;
}
```

---

### Problem 4.3: Same Tree
**LeetCode #100 — Easy**

> Check if two binary trees are identical.

```typescript
function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
    // Both null → same
    if (p === null && q === null) return true;

    // One null, other not → different
    if (p === null || q === null) return false;

    // Both non-null → compare values and recursively check children
    return (
        p.val === q.val &&
        isSameTree(p.left, q.left) &&
        isSameTree(p.right, q.right)
    );
}
```

---

### Problem 4.4: Subtree of Another Tree
**LeetCode #572 — Easy**

> Check if one tree is a subtree of another.

**Why this problem:** Combines "same tree" check with tree traversal. Teaches decomposing problems into sub-problems.

```typescript
function isSubtree(
    root: TreeNode | null,
    subRoot: TreeNode | null
): boolean {
    if (root === null) return false;

    // Check if the tree rooted here matches subRoot
    if (isSameTree(root, subRoot)) return true;

    // Otherwise, check left and right subtrees
    return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
}

function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
    if (p === null && q === null) return true;
    if (p === null || q === null) return false;
    return (
        p.val === q.val &&
        isSameTree(p.left, q.left) &&
        isSameTree(p.right, q.right)
    );
}
```

---

### Problem 4.5: Binary Tree Level Order Traversal — BFS
**LeetCode #102 — Medium**

> Return the level-order traversal of a tree (values grouped by level).

**Why this problem:** The definitive tree BFS problem. The "process level by level" technique is used everywhere.

```typescript
function levelOrder(root: TreeNode | null): number[][] {
    if (root === null) return [];

    const result: number[][] = [];
    const queue: TreeNode[] = [root];

    while (queue.length > 0) {
        const levelSize = queue.length; // number of nodes at this level
        const currentLevel: number[] = [];

        // Process ALL nodes at the current level
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift()!;
            currentLevel.push(node.val);

            // Add children to queue for next level
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        result.push(currentLevel);
    }

    return result;
}
```

**Key technique:** `const levelSize = queue.length` captures the number of nodes at the current level **before** we start adding children. This lets us process exactly one level per outer loop iteration.

**Dry run:**
```
        3
       / \
      9  20
        /  \
       15   7

Queue starts: [3]

Level 0: levelSize=1
  Process 3, add 9 and 20 → queue=[9, 20]
  currentLevel=[3]

Level 1: levelSize=2
  Process 9 (no children), Process 20 (add 15, 7) → queue=[15, 7]
  currentLevel=[9, 20]

Level 2: levelSize=2
  Process 15 (no children), Process 7 (no children) → queue=[]
  currentLevel=[15, 7]

Result: [[3], [9, 20], [15, 7]] ✓
```

---

### Problem 4.6: Validate Binary Search Tree
**LeetCode #98 — Medium**

> Determine if a binary tree is a valid BST.

**Why this problem:** Tests understanding of BST property. The common mistake is only checking immediate children instead of enforcing bounds across the entire subtree.

**Key insight:** Each node must be within a valid range `(min, max)`. The root can be anything. The left child must be `< parent`, the right child must be `> parent`. These constraints propagate down.

```typescript
function isValidBST(root: TreeNode | null): boolean {
    return validate(root, -Infinity, Infinity);
}

function validate(
    node: TreeNode | null,
    min: number,
    max: number
): boolean {
    if (node === null) return true;

    // Current node must be within the valid range
    if (node.val <= min || node.val >= max) return false;

    // Left child must be < current node (update max)
    // Right child must be > current node (update min)
    return (
        validate(node.left, min, node.val) &&
        validate(node.right, node.val, max)
    );
}
```

**Alternative: In-order traversal should produce sorted values**
```typescript
function isValidBSTInorder(root: TreeNode | null): boolean {
    let prev = -Infinity;

    function inorder(node: TreeNode | null): boolean {
        if (node === null) return true;

        // Check left subtree
        if (!inorder(node.left)) return false;

        // Check current node against previous in-order value
        if (node.val <= prev) return false;
        prev = node.val;

        // Check right subtree
        return inorder(node.right);
    }

    return inorder(root);
}
```

---

### Problem 4.7: Lowest Common Ancestor of a Binary Tree
**LeetCode #236 — Medium**

> Find the lowest common ancestor (LCA) of two nodes in a binary tree.

**Why this problem:** One of the most important and frequently asked tree problems. The elegant recursive solution teaches deep recursive thinking.

**Key insight:** For any node:
- If both `p` and `q` are in the left subtree → LCA is in the left subtree
- If both are in the right subtree → LCA is in the right subtree
- If one is in each subtree → the current node is the LCA
- If the current node IS `p` or `q` → the current node is the LCA

```typescript
function lowestCommonAncestor(
    root: TreeNode | null,
    p: TreeNode,
    q: TreeNode
): TreeNode | null {
    // Base case: reached null, or found p or q
    if (root === null || root === p || root === q) {
        return root;
    }

    // Search in both subtrees
    const left = lowestCommonAncestor(root.left, p, q);
    const right = lowestCommonAncestor(root.right, p, q);

    // If both sides found something, current node is the LCA
    if (left !== null && right !== null) {
        return root;
    }

    // Otherwise, return whichever side found something
    return left ?? right;
}
```

**Trace:**
```
        3
       / \
      5   1
     / \ / \
    6  2 0  8

LCA of 5 and 1:
  lowestCommonAncestor(3, 5, 1)
    left = lowestCommonAncestor(5, 5, 1) → returns 5 (found p)
    right = lowestCommonAncestor(1, 5, 1) → returns 1 (found q)
    Both non-null → return 3 (current node is LCA) ✓

LCA of 5 and 2:
  lowestCommonAncestor(3, 5, 2)
    left = lowestCommonAncestor(5, 5, 2) → returns 5 (found p at 5, and 2 is below)
    right = lowestCommonAncestor(1, 5, 2) → returns null
    left is non-null, right is null → return 5 (LCA is 5 itself) ✓
```

---

### Problem 4.8: Diameter of Binary Tree
**LeetCode #543 — Easy**

> Find the length of the longest path between any two nodes (counted by edges).

**Why this problem:** Teaches the pattern of using a "global variable" updated during recursion while the function returns something different.

**Key insight:** The diameter through any node = left height + right height. The function returns height, but we track the maximum diameter seen.

```typescript
function diameterOfBinaryTree(root: TreeNode | null): number {
    let maxDiameter = 0;

    function height(node: TreeNode | null): number {
        if (node === null) return 0;

        const leftHeight = height(node.left);
        const rightHeight = height(node.right);

        // The diameter through this node is leftHeight + rightHeight
        maxDiameter = Math.max(maxDiameter, leftHeight + rightHeight);

        // Return the height of this subtree
        return 1 + Math.max(leftHeight, rightHeight);
    }

    height(root);
    return maxDiameter;
}
```

**Why the function returns height but we care about diameter:**
This is a common pattern: the recursive function computes one thing (height), but as a **side effect**, it updates a broader answer (diameter). The height is what children need to report to their parent. The diameter is the global answer we're building.

---

### Problem 4.9: Kth Smallest Element in a BST
**LeetCode #230 — Medium**

> Find the kth smallest element in a BST.

**Why this problem:** Directly leverages the BST property that in-order traversal gives sorted order.

```typescript
function kthSmallest(root: TreeNode | null, k: number): number {
    let count = 0;
    let result = 0;

    function inorder(node: TreeNode | null): void {
        if (node === null || count >= k) return;

        inorder(node.left);

        count++;
        if (count === k) {
            result = node.val;
            return;
        }

        inorder(node.right);
    }

    inorder(root);
    return result;
}

// Iterative version using explicit stack (good to know)
function kthSmallestIterative(root: TreeNode | null, k: number): number {
    const stack: TreeNode[] = [];
    let current = root;
    let count = 0;

    while (current !== null || stack.length > 0) {
        // Go as far left as possible
        while (current !== null) {
            stack.push(current);
            current = current.left;
        }

        // Process the node
        current = stack.pop()!;
        count++;

        if (count === k) return current.val;

        // Move to right subtree
        current = current.right;
    }

    return -1; // shouldn't reach here if k is valid
}
```

---

### Problem 4.10: Binary Tree Right Side View
**LeetCode #199 — Medium**

> Return the values visible from the right side of the tree (last node at each level).

**Why this problem:** BFS with "take the last element of each level," or DFS with "right child first."

```typescript
// BFS approach — take last element of each level
function rightSideView(root: TreeNode | null): number[] {
    if (root === null) return [];

    const result: number[] = [];
    const queue: TreeNode[] = [root];

    while (queue.length > 0) {
        const levelSize = queue.length;

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift()!;

            // The last node in each level is visible from the right
            if (i === levelSize - 1) {
                result.push(node.val);
            }

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }

    return result;
}

// DFS approach — visit right child first, take the first node at each new depth
function rightSideViewDFS(root: TreeNode | null): number[] {
    const result: number[] = [];

    function dfs(node: TreeNode | null, depth: number): void {
        if (node === null) return;

        // If this is the first node we've seen at this depth,
        // it's the rightmost (because we visit right first)
        if (depth === result.length) {
            result.push(node.val);
        }

        dfs(node.right, depth + 1); // right first!
        dfs(node.left, depth + 1);
    }

    dfs(root, 0);
    return result;
}
```

---

### Problem 4.11: Construct Binary Tree from Preorder and Inorder
**LeetCode #105 — Medium**

> Given preorder and inorder traversal arrays, reconstruct the tree.

**Why this problem:** Tests deep understanding of traversal orders. A classic medium that frequently appears in interviews.

**Key insight:**
- Preorder: `[root, ...leftSubtree, ...rightSubtree]` → first element is always the root
- Inorder: `[...leftSubtree, root, ...rightSubtree]` → root's position splits left and right subtrees

```typescript
function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
    // Map each value to its index in inorder for O(1) lookup
    const inorderMap = new Map<number, number>();
    for (let i = 0; i < inorder.length; i++) {
        inorderMap.set(inorder[i], i);
    }

    let preorderIdx = 0;

    function build(inLeft: number, inRight: number): TreeNode | null {
        if (inLeft > inRight) return null;

        // The next element in preorder is the root of this subtree
        const rootVal = preorder[preorderIdx];
        preorderIdx++;

        const root = new TreeNode(rootVal);

        // Find root's position in inorder
        const inorderRootIdx = inorderMap.get(rootVal)!;

        // Build left subtree (elements before root in inorder)
        root.left = build(inLeft, inorderRootIdx - 1);

        // Build right subtree (elements after root in inorder)
        root.right = build(inorderRootIdx + 1, inRight);

        return root;
    }

    return build(0, inorder.length - 1);
}
```

**Dry run:**
```
preorder = [3, 9, 20, 15, 7]
inorder  = [9, 3, 15, 20, 7]

build(0, 4):
  root = 3 (preorder[0])
  inorder position of 3 = 1
  left = build(0, 0):      → inorder[0..0] = [9]
    root = 9 (preorder[1])
    left = build(0, -1) = null
    right = build(1, 0) = null → return TreeNode(9)
  right = build(2, 4):     → inorder[2..4] = [15, 20, 7]
    root = 20 (preorder[2])
    inorder position of 20 = 3
    left = build(2, 2):    → inorder[2..2] = [15]
      root = 15 → return TreeNode(15)
    right = build(4, 4):   → inorder[4..4] = [7]
      root = 7 → return TreeNode(7)
    return TreeNode(20, 15, 7)
  return TreeNode(3, 9, 20)

        3
       / \
      9  20
        /  \
       15   7   ✓
```

---

### Tree Problem-Solving Cheat Sheet

```
"Find depth/height"          → recursive DFS, return 1 + max(left, right)
"Find diameter/longest path" → DFS returning height, update global max
"Check property of tree"     → recursive DFS with bounds/conditions
"Level-order anything"       → BFS with levelSize loop
"Serialize/deserialize"      → BFS or preorder DFS
"BST operations"             → leverage sorted in-order property
"Path sum"                   → DFS, subtract from target as you go
"LCA"                        → recursive search returning found node
"Construct tree"             → preorder/inorder split technique
```

---

### More Tree Problems to Practice

| # | Problem | Key Concept |
|---|---|---|
| 110 | Balanced Binary Tree | Height check with early termination |
| 101 | Symmetric Tree | Compare mirror subtrees |
| 112 | Path Sum | DFS with running sum |
| 124 | Binary Tree Max Path Sum | Global max during DFS (Hard) |
| 297 | Serialize and Deserialize Binary Tree | BFS or DFS encoding (Hard) |
| 235 | LCA of a BST | Leverage BST property for simpler LCA |
| 208 | Implement Trie | Prefix tree (preview of advanced) |
| 1448 | Count Good Nodes | DFS with running max |

---

---

## Topic 5: Graphs — Fundamentals

### Why This Matters

Graphs generalize trees (a tree is a connected acyclic graph). Many real-world problems — social networks, maps, dependencies, web crawling — are graph problems. The two fundamental traversals (BFS and DFS) plus the ability to represent and reason about graphs are essential interview skills.

### Core Concepts to Master

**1. Graph Terminology:**
```
- Vertex/Node: an entity
- Edge: a connection between two vertices
- Directed vs Undirected
- Weighted vs Unweighted
- Cycle: a path that returns to the starting vertex
- Connected component: a group of vertices all reachable from each other
- Degree: number of edges connected to a vertex
  (in-degree / out-degree for directed graphs)
```

**2. Graph Representations:**

```typescript
// Adjacency List (most common for interviews)
// Unweighted:
const graph: Map<number, number[]> = new Map();
// or
const graph: number[][] = []; // graph[i] = list of neighbors of node i

// Build from edge list:
function buildGraph(n: number, edges: number[][]): number[][] {
    const graph: number[][] = Array.from({ length: n }, () => []);

    for (const [u, v] of edges) {
        graph[u].push(v);
        graph[v].push(u); // remove this line for directed graphs
    }

    return graph;
}

// Weighted:
// graph[i] = [[neighbor, weight], ...]
function buildWeightedGraph(
    n: number,
    edges: number[][]
): [number, number][][] {
    const graph: [number, number][][] = Array.from({ length: n }, () => []);

    for (const [u, v, w] of edges) {
        graph[u].push([v, w]);
        graph[v].push([u, w]); // remove for directed
    }

    return graph;
}
```

```typescript
// Adjacency Matrix (use when n is small or you need O(1) edge lookup)
const matrix: boolean[][] = Array.from(
    { length: n },
    () => new Array(n).fill(false)
);
matrix[u][v] = true; // edge from u to v
```

**3. When to use each representation:**

| | Adjacency List | Adjacency Matrix |
|---|---|---|
| Space | O(V + E) | O(V²) |
| Check edge exists | O(degree) | O(1) |
| Iterate neighbors | O(degree) | O(V) |
| Best for | Sparse graphs (most interviews) | Dense graphs, small V |

**4. BFS vs DFS for Graphs:**

| | BFS | DFS |
|---|---|---|
| Structure | Queue | Stack (or recursion) |
| Explores | Level by level | Deep before wide |
| Best for | Shortest path (unweighted), level processing | Cycle detection, topological sort, connected components, path existence |
| Space | O(V) for queue | O(V) for recursion/stack |

**5. Critical difference from trees:** Graphs can have **cycles**. You **must** track visited nodes to avoid infinite loops.

---

### Problem 5.1: Number of Islands
**LeetCode #200 — Medium**

> Given a 2D grid of '1's (land) and '0's (water), count the number of islands.

**Why this problem:** The classic graph problem disguised as a grid. Each cell is a node, adjacent cells are connected by edges. An island is a connected component of '1's.

```typescript
// DFS approach
function numIslands(grid: string[][]): number {
    if (grid.length === 0) return 0;

    const rows = grid.length;
    const cols = grid[0].length;
    let islandCount = 0;

    function dfs(r: number, c: number): void {
        // Boundary check + water check + already visited check
        if (
            r < 0 || r >= rows ||
            c < 0 || c >= cols ||
            grid[r][c] === '0'
        ) {
            return;
        }

        // Mark as visited by sinking the land
        grid[r][c] = '0';

        // Explore all 4 directions
        dfs(r + 1, c);
        dfs(r - 1, c);
        dfs(r, c + 1);
        dfs(r, c - 1);
    }

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === '1') {
                islandCount++;
                dfs(r, c); // sink the entire island
            }
        }
    }

    return islandCount;
}
```

**BFS approach (equally valid):**
```typescript
function numIslandsBFS(grid: string[][]): number {
    if (grid.length === 0) return 0;

    const rows = grid.length;
    const cols = grid[0].length;
    let islandCount = 0;
    const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === '1') {
                islandCount++;

                // BFS to sink the entire island
                const queue: [number, number][] = [[r, c]];
                grid[r][c] = '0';

                while (queue.length > 0) {
                    const [cr, cc] = queue.shift()!;

                    for (const [dr, dc] of directions) {
                        const nr = cr + dr;
                        const nc = cc + dc;

                        if (
                            nr >= 0 && nr < rows &&
                            nc >= 0 && nc < cols &&
                            grid[nr][nc] === '1'
                        ) {
                            grid[nr][nc] = '0'; // mark visited BEFORE adding
                            queue.push([nr, nc]);
                        }
                    }
                }
            }
        }
    }

    return islandCount;
}
```

**Important BFS detail:** Mark nodes as visited **when adding to the queue**, not when processing. Otherwise, duplicate nodes will be added to the queue.

**Dry run:**
```
Grid:
  1 1 0 0 0
  1 1 0 0 0
  0 0 1 0 0
  0 0 0 1 1

(0,0)='1' → island 1! DFS sinks (0,0),(0,1),(1,0),(1,1)
(2,2)='1' → island 2! DFS sinks (2,2)
(3,3)='1' → island 3! DFS sinks (3,3),(3,4)

Count = 3 ✓
```

---

### Problem 5.2: Clone Graph
**LeetCode #133 — Medium**

> Create a deep copy of a graph. Each node has a value and a list of neighbors.

**Why this problem:** Teaches graph traversal with a hash map to track cloned nodes — a pattern used in many "copy" problems.

```typescript
class GraphNode {
    val: number;
    neighbors: GraphNode[];

    constructor(val: number = 0, neighbors: GraphNode[] = []) {
        this.val = val;
        this.neighbors = neighbors;
    }
}

function cloneGraph(node: GraphNode | null): GraphNode | null {
    if (node === null) return null;

    // Map from original node → cloned node
    const cloned = new Map<GraphNode, GraphNode>();

    function dfs(original: GraphNode): GraphNode {
        // If already cloned, return the clone
        if (cloned.has(original)) {
            return cloned.get(original)!;
        }

        // Create clone (without neighbors for now)
        const copy = new GraphNode(original.val);
        cloned.set(original, copy);

        // Recursively clone all neighbors
        for (const neighbor of original.neighbors) {
            copy.neighbors.push(dfs(neighbor));
        }

        return copy;
    }

    return dfs(node);
}
```

---

### Problem 5.3: Max Area of Island
**LeetCode #695 — Medium**

> Find the maximum area of an island in a 2D grid.

**Why this problem:** Builds on Number of Islands. Instead of just counting, you return the size from each DFS.

```typescript
function maxAreaOfIsland(grid: number[][]): number {
    const rows = grid.length;
    const cols = grid[0].length;
    let maxArea = 0;

    function dfs(r: number, c: number): number {
        if (
            r < 0 || r >= rows ||
            c < 0 || c >= cols ||
            grid[r][c] === 0
        ) {
            return 0;
        }

        grid[r][c] = 0; // mark visited

        return 1 + dfs(r + 1, c) + dfs(r - 1, c) + dfs(r, c + 1) + dfs(r, c - 1);
    }

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === 1) {
                maxArea = Math.max(maxArea, dfs(r, c));
            }
        }
    }

    return maxArea;
}
```

---

### Problem 5.4: Rotting Oranges — Multi-source BFS
**LeetCode #994 — Medium**

> Every minute, fresh oranges adjacent to rotten ones become rotten. Return the minutes until no fresh oranges remain, or -1 if impossible.

**Why this problem:** Introduces **multi-source BFS** — starting from multiple sources simultaneously. This is the standard pattern for "spread from multiple points" or "minimum time to affect all nodes."

```typescript
function orangesRotting(grid: number[][]): number {
    const rows = grid.length;
    const cols = grid[0].length;
    const queue: [number, number][] = [];
    let freshCount = 0;

    // Initialize: find all rotten oranges and count fresh ones
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === 2) {
                queue.push([r, c]); // all rotten oranges are BFS sources
            } else if (grid[r][c] === 1) {
                freshCount++;
            }
        }
    }

    // Edge case: no fresh oranges
    if (freshCount === 0) return 0;

    const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];
    let minutes = 0;

    // BFS level by level (each level = 1 minute)
    while (queue.length > 0) {
        const levelSize = queue.length;
        let rottenThisMinute = false;

        for (let i = 0; i < levelSize; i++) {
            const [r, c] = queue.shift()!;

            for (const [dr, dc] of directions) {
                const nr = r + dr;
                const nc = c + dc;

                if (
                    nr >= 0 && nr < rows &&
                    nc >= 0 && nc < cols &&
                    grid[nr][nc] === 1  // fresh orange
                ) {
                    grid[nr][nc] = 2; // now rotten
                    freshCount--;
                    queue.push([nr, nc]);
                    rottenThisMinute = true;
                }
            }
        }

        if (rottenThisMinute) minutes++;
    }

    return freshCount === 0 ? minutes : -1;
}
```

**Multi-source BFS pattern:** Instead of starting with one source, you add ALL sources to the queue before starting. The BFS then expands from all sources simultaneously, guaranteeing shortest distances from the nearest source.

---

### Problem 5.5: Pacific Atlantic Water Flow
**LeetCode #417 — Medium**

> Find cells where water can flow to both the Pacific and Atlantic oceans. Water flows from higher to equal/lower cells. Pacific touches top/left, Atlantic touches bottom/right.

**Why this problem:** Teaches **reverse thinking** — instead of asking "where can water FROM this cell reach?", ask "what cells can reach EACH ocean?" Run DFS/BFS from the ocean borders inward.

```typescript
function pacificAtlantic(heights: number[][]): number[][] {
    const rows = heights.length;
    const cols = heights[0].length;

    const pacificReachable = Array.from(
        { length: rows },
        () => new Array(cols).fill(false)
    );
    const atlanticReachable = Array.from(
        { length: rows },
        () => new Array(cols).fill(false)
    );

    const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];

    function dfs(
        r: number,
        c: number,
        reachable: boolean[][],
        prevHeight: number
    ): void {
        if (
            r < 0 || r >= rows ||
            c < 0 || c >= cols ||
            reachable[r][c] ||         // already visited
            heights[r][c] < prevHeight  // water can't flow uphill (we're going in reverse)
        ) {
            return;
        }

        reachable[r][c] = true;

        for (const [dr, dc] of directions) {
            dfs(r + dr, c + dc, reachable, heights[r][c]);
        }
    }

    // DFS from Pacific borders (top row + left column)
    for (let c = 0; c < cols; c++) dfs(0, c, pacificReachable, 0);
    for (let r = 0; r < rows; r++) dfs(r, 0, pacificReachable, 0);

    // DFS from Atlantic borders (bottom row + right column)
    for (let c = 0; c < cols; c++) dfs(rows - 1, c, atlanticReachable, 0);
    for (let r = 0; r < rows; r++) dfs(r, cols - 1, atlanticReachable, 0);

    // Find cells reachable from BOTH oceans
    const result: number[][] = [];
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (pacificReachable[r][c] && atlanticReachable[r][c]) {
                result.push([r, c]);
            }
        }
    }

    return result;
}
```

---

### Problem 5.6: Course Schedule — Cycle Detection in Directed Graph
**LeetCode #207 — Medium**

> Given `numCourses` and prerequisite pairs, determine if it's possible to finish all courses (i.e., the dependency graph has no cycle).

**Why this problem:** Introduces directed graph cycle detection, which leads directly into topological sort.

**Approach 1: DFS with coloring**
Three states for each node:
- `UNVISITED (0)`: haven't seen this node yet
- `VISITING (1)`: currently in the DFS stack (part of the current path)
- `VISITED (2)`: fully processed, all descendants explored

If you encounter a `VISITING` node, you've found a cycle.

```typescript
function canFinish(
    numCourses: number,
    prerequisites: number[][]
): boolean {
    // Build adjacency list
    const graph: number[][] = Array.from(
        { length: numCourses },
        () => []
    );
    for (const [course, prereq] of prerequisites) {
        graph[prereq].push(course);
    }

    const UNVISITED = 0, VISITING = 1, VISITED = 2;
    const state = new Array(numCourses).fill(UNVISITED);

    function hasCycle(node: number): boolean {
        if (state[node] === VISITING) return true;  // cycle detected!
        if (state[node] === VISITED) return false;   // already processed

        state[node] = VISITING; // mark as in-progress

        for (const neighbor of graph[node]) {
            if (hasCycle(neighbor)) return true;
        }

        state[node] = VISITED; // mark as complete
        return false;
    }

    // Check every node (graph might be disconnected)
    for (let i = 0; i < numCourses; i++) {
        if (hasCycle(i)) return false;
    }

    return true;
}
```

**Approach 2: BFS / Kahn's Algorithm (Topological Sort)**
This also solves Course Schedule II (getting the actual order).

```typescript
function canFinishBFS(
    numCourses: number,
    prerequisites: number[][]
): boolean {
    const graph: number[][] = Array.from(
        { length: numCourses },
        () => []
    );
    const inDegree = new Array(numCourses).fill(0);

    for (const [course, prereq] of prerequisites) {
        graph[prereq].push(course);
        inDegree[course]++;
    }

    // Start with all courses that have no prerequisites
    const queue: number[] = [];
    for (let i = 0; i < numCourses; i++) {
        if (inDegree[i] === 0) queue.push(i);
    }

    let processedCount = 0;

    while (queue.length > 0) {
        const course = queue.shift()!;
        processedCount++;

        for (const next of graph[course]) {
            inDegree[next]--;
            if (inDegree[next] === 0) {
                queue.push(next);
            }
        }
    }

    // If we processed all courses, no cycle exists
    return processedCount === numCourses;
}
```

**Kahn's Algorithm — how it works:**
1. Compute in-degree (number of incoming edges) for every node
2. Add all nodes with in-degree 0 to a queue (no dependencies)
3. Process each node: decrement in-degree of neighbors; if any drops to 0, add to queue
4. If all nodes are processed, no cycle. If some remain, they're in a cycle.

---

### Problem 5.7: Course Schedule II — Topological Sort
**LeetCode #210 — Medium**

> Return a valid ordering to take all courses (or empty array if impossible).

```typescript
function findOrder(
    numCourses: number,
    prerequisites: number[][]
): number[] {
    const graph: number[][] = Array.from(
        { length: numCourses },
        () => []
    );
    const inDegree = new Array(numCourses).fill(0);

    for (const [course, prereq] of prerequisites) {
        graph[prereq].push(course);
        inDegree[course]++;
    }

    const queue: number[] = [];
    for (let i = 0; i < numCourses; i++) {
        if (inDegree[i] === 0) queue.push(i);
    }

    const order: number[] = [];

    while (queue.length > 0) {
        const course = queue.shift()!;
        order.push(course);

        for (const next of graph[course]) {
            inDegree[next]--;
            if (inDegree[next] === 0) {
                queue.push(next);
            }
        }
    }

    return order.length === numCourses ? order : [];
}
```

---

### Problem 5.8: Shortest Path in Binary Matrix
**LeetCode #1091 — Medium**

> Find the shortest path from top-left to bottom-right in a binary matrix (0=open, 1=blocked). Can move in 8 directions.

**Why this problem:** Classic BFS shortest path on a grid — the fundamental "minimum steps" pattern.

```typescript
function shortestPathBinaryMatrix(grid: number[][]): number {
    const n = grid.length;

    // Edge case: start or end is blocked
    if (grid[0][0] === 1 || grid[n - 1][n - 1] === 1) return -1;

    // 8 directions (including diagonals)
    const directions = [
        [0, 1], [0, -1], [1, 0], [-1, 0],
        [1, 1], [1, -1], [-1, 1], [-1, -1]
    ];

    const queue: [number, number, number][] = [[0, 0, 1]]; // [row, col, pathLength]
    grid[0][0] = 1; // mark visited

    while (queue.length > 0) {
        const [r, c, dist] = queue.shift()!;

        // Reached the destination
        if (r === n - 1 && c === n - 1) return dist;

        for (const [dr, dc] of directions) {
            const nr = r + dr;
            const nc = c + dc;

            if (
                nr >= 0 && nr < n &&
                nc >= 0 && nc < n &&
                grid[nr][nc] === 0
            ) {
                grid[nr][nc] = 1; // mark visited
                queue.push([nr, nc, dist + 1]);
            }
        }
    }

    return -1; // unreachable
}
```

**Why BFS guarantees shortest path (unweighted):** BFS explores all nodes at distance d before any node at distance d+1. So the first time we reach a node is via the shortest path.

---

### Graph Problem-Solving Cheat Sheet

```
"Number of islands/components"     → DFS/BFS, mark visited, count starts
"Shortest path (unweighted)"       → BFS
"Shortest path (weighted)"         → Dijkstra (Phase 3)
"Can I reach X from Y?"            → DFS or BFS
"Detect cycle (undirected)"        → DFS with parent tracking, or Union-Find
"Detect cycle (directed)"          → DFS with 3 colors, or Topological Sort
"Course schedule / dependencies"   → Topological Sort (Kahn's / DFS)
"Connected components"             → DFS/BFS or Union-Find
"Minimum spanning tree"            → Kruskal's or Prim's (less common)
"Bi-partite check"                 → BFS/DFS with 2-coloring
"Spread from multiple sources"     → Multi-source BFS
```

### Grid-Specific Template
```typescript
// Reusable grid traversal pattern
const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];

function isValid(r: number, c: number, rows: number, cols: number): boolean {
    return r >= 0 && r < rows && c >= 0 && c < cols;
}
```

---

### More Graph Problems to Practice

| # | Problem | Key Concept |
|---|---|---|
| 733 | Flood Fill | Simple DFS/BFS on grid |
| 130 | Surrounded Regions | Border DFS, then flip |
| 785 | Is Graph Bipartite | BFS/DFS 2-coloring |
| 542 | 01 Matrix | Multi-source BFS from all 0s |
| 1020 | Number of Enclaves | Border DFS |
| 802 | Find Eventual Safe States | Reverse graph + topological |
| 841 | Keys and Rooms | DFS reachability |
| 323 | Number of Connected Components | DFS/BFS or Union-Find |

---

---

## Phase 2: Putting It All Together

### Week 3 Daily Schedule

| Day | Focus | Problems |
|---|---|---|
| Day 1 | Binary Search basics | #704 Binary Search, #278 First Bad Version, #35 Search Insert Position |
| Day 2 | Binary Search boundaries | #34 First and Last Position, #153 Find Min in Rotated Array |
| Day 3 | Binary Search on rotated/answer | #33 Search in Rotated Sorted Array, #875 Koko Eating Bananas |
| Day 4 | Stacks basics | #20 Valid Parentheses, #155 Min Stack, #150 Evaluate RPN |
| Day 5 | Monotonic Stacks | #739 Daily Temperatures, #496 Next Greater Element I |
| Day 6 | Stacks advanced + review | #394 Decode String, re-solve any struggles |
| Day 7 | Rest or light review | |

### Week 4 Daily Schedule

| Day | Focus | Problems |
|---|---|---|
| Day 8 | Linked List basics | #206 Reverse Linked List, #21 Merge Two Sorted Lists, #141 Linked List Cycle |
| Day 9 | Linked List patterns | #19 Remove Nth from End, #876 Middle of LL, #142 Linked List Cycle II |
| Day 10 | Linked List advanced | #143 Reorder List, #234 Palindrome LL, #2 Add Two Numbers |
| Day 11 | Trees basics (DFS) | #104 Max Depth, #226 Invert Tree, #100 Same Tree, #572 Subtree |
| Day 12 | Trees DFS continued | #543 Diameter, #110 Balanced Tree, #112 Path Sum |
| Day 13 | Trees BST + BFS | #98 Validate BST, #230 Kth Smallest, #102 Level Order Traversal |
| Day 14 | Trees advanced | #236 LCA, #199 Right Side View, #105 Build Tree from Preorder/Inorder |

### Week 5 Daily Schedule

| Day | Focus | Problems |
|---|---|---|
| Day 15 | Graph basics (grid) | #200 Number of Islands, #695 Max Area of Island, #733 Flood Fill |
| Day 16 | Graph BFS | #994 Rotting Oranges, #1091 Shortest Path in Binary Matrix |
| Day 17 | Graph DFS + traversal | #133 Clone Graph, #417 Pacific Atlantic Water Flow |
| Day 18 | Graph directed + topo sort | #207 Course Schedule, #210 Course Schedule II |
| Day 19 | Mixed practice (binary search + trees) | #162 Find Peak Element, #1448 Count Good Nodes, #74 Search 2D Matrix |
| Day 20 | Mixed practice (stacks + graphs) | #84 Largest Rectangle in Histogram, #130 Surrounded Regions |
| Day 21 | Phase 2 assessment | Pick 4 unseen problems across all Phase 2 topics, solve timed (30 min each) |

---

### Checklist Before Moving to Phase 3

You should be able to confidently answer YES to all of these:

- [ ] I can write binary search (exact, first true, last true) without bugs on the first attempt
- [ ] I recognize "binary search on answer" opportunities and can write the feasibility check
- [ ] I instinctively reach for a stack when I see nested structure or "next greater" problems
- [ ] I can reverse a linked list iteratively without hesitation
- [ ] I know the dummy node trick and use it by default for linked list problems
- [ ] I can solve tree problems by defining: what does my function return? base case? combine step?
- [ ] I understand BFS level-by-level processing with `levelSize`
- [ ] I can validate a BST using bounds or in-order traversal
- [ ] I can set up a graph from an edge list and traverse it with BFS or DFS
- [ ] I always remember to track visited nodes in graph problems
- [ ] I can detect cycles in directed graphs (3-color DFS or topological sort)
- [ ] I know when to use BFS (shortest path, levels) vs DFS (existence, all paths, components)
- [ ] I can analyze time and space complexity for all these patterns

---
