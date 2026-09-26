# Phase 1: Foundations (Weeks 1–2)

## The Goal

Build rock-solid fundamentals. Every advanced pattern you'll learn later is built on top of these. Phase 1 is about becoming so comfortable with arrays, strings, hash maps, two pointers, sliding window, and basic sorting that they become second nature. You should be able to identify and implement these in your sleep.

---

---

## Topic 1: Arrays — The Foundation of Everything

### Why This Matters

Arrays are the most common data structure in interviews. Nearly every problem either uses an array directly or transforms into one. You need to master traversal, in-place manipulation, and understanding how index math works.

### Core Concepts to Master

**1. Traversal patterns:**
- Forward, backward, from both ends, every k-th element
- Nested traversal (comparing every pair)

**2. In-place manipulation:**
- Swapping elements
- Overwriting from the front (write pointer pattern)
- Shifting elements

**3. Index as implicit data:**
- Using the index itself to encode information
- Mapping values to indices (when values are in a known range)

**4. Common operations and their costs:**

| Operation | Time |
|---|---|
| Access by index | O(1) |
| Push to end | O(1) amortized |
| Insert/Delete at arbitrary position | O(n) |
| Search (unsorted) | O(n) |
| Search (sorted) | O(log n) |

---

### Problem 1.1: Remove Duplicates from Sorted Array
**LeetCode #26 — Easy**

> Given a sorted array, remove duplicates in-place and return the new length. The first k elements should contain the unique values.

**Why this problem:** It teaches the "read/write pointer" technique — a fundamental array manipulation pattern.

**Thinking process:**
- The array is sorted → duplicates are adjacent
- We need in-place → can't create a new array
- Use a "write pointer" that only advances when we find a new unique value
- A "read pointer" scans every element

```typescript
function removeDuplicates(nums: number[]): number {
    if (nums.length === 0) return 0;

    // writePointer tracks where the next unique element should go.
    // Everything at index <= writePointer is our "result so far."
    let writePointer = 0;

    // readPointer scans through every element starting from index 1.
    for (let readPointer = 1; readPointer < nums.length; readPointer++) {
        // If the current element is different from the last unique
        // element we wrote, it's a new unique value.
        if (nums[readPointer] !== nums[writePointer]) {
            writePointer++;
            nums[writePointer] = nums[readPointer];
        }
        // If they're equal, we skip — readPointer advances but
        // writePointer stays put.
    }

    // writePointer is the index of the last unique element.
    // The count of unique elements is writePointer + 1.
    return writePointer + 1;
}
```

**Dry run:**
```
Input: [1, 1, 2, 2, 3]

readPointer=1: nums[1]=1 === nums[0]=1 → skip
readPointer=2: nums[2]=2 !== nums[0]=1 → write: wp=1, nums[1]=2 → [1,2,2,2,3]
readPointer=3: nums[3]=2 === nums[1]=2 → skip
readPointer=4: nums[4]=3 !== nums[1]=2 → write: wp=2, nums[2]=3 → [1,2,3,2,3]

Return 3. First 3 elements: [1, 2, 3] ✓
```

**Complexity:** O(n) time, O(1) space.

---

### Problem 1.2: Best Time to Buy and Sell Stock
**LeetCode #121 — Easy**

> Given an array where `prices[i]` is the stock price on day i, find the maximum profit from one buy and one sell (buy before sell).

**Why this problem:** It teaches tracking a running minimum and computing the best result at each step — a pattern that appears everywhere.

**Thinking process:**
- Brute force: try every pair (i, j) where i < j → O(n²)
- Optimization: as we scan left to right, we only care about the **minimum price seen so far** (best day to have bought)
- At each day, the best profit if we sell today = today's price − min price so far
- Track the global maximum of this

```typescript
function maxProfit(prices: number[]): number {
    // Edge case: can't make any transaction
    if (prices.length < 2) return 0;

    let minPriceSoFar = prices[0]; // cheapest buying opportunity so far
    let maxProfit = 0;             // best profit we've seen

    for (let i = 1; i < prices.length; i++) {
        // If we sold today, what would our profit be?
        const profitIfSoldToday = prices[i] - minPriceSoFar;

        // Update the best profit
        maxProfit = Math.max(maxProfit, profitIfSoldToday);

        // Update the cheapest buying opportunity
        minPriceSoFar = Math.min(minPriceSoFar, prices[i]);
    }

    return maxProfit;
}
```

**Dry run:**
```
prices = [7, 1, 5, 3, 6, 4]

i=1: price=1, profit=1-7=-6, maxProfit=0,  minPrice=1
i=2: price=5, profit=5-1=4,  maxProfit=4,  minPrice=1
i=3: price=3, profit=3-1=2,  maxProfit=4,  minPrice=1
i=4: price=6, profit=6-1=5,  maxProfit=5,  minPrice=1
i=5: price=4, profit=4-1=3,  maxProfit=5,  minPrice=1

Return 5 (buy at 1, sell at 6) ✓
```

**Complexity:** O(n) time, O(1) space.

---

### Problem 1.3: Majority Element
**LeetCode #169 — Easy**

> Find the element that appears more than n/2 times. Guaranteed to exist.

**Why this problem:** Introduces Boyer-Moore Voting Algorithm — an elegant O(1) space trick. Also solvable with hash maps (good practice for Topic 3).

```typescript
// Approach 1: Hash Map (straightforward)
function majorityElementHashMap(nums: number[]): number {
    const freq: Map<number, number> = new Map();

    for (const num of nums) {
        freq.set(num, (freq.get(num) ?? 0) + 1);
        if (freq.get(num)! > nums.length / 2) {
            return num;
        }
    }

    return -1; // won't reach here per problem guarantee
}

// Approach 2: Boyer-Moore Voting Algorithm
// Intuition: the majority element can "survive" being cancelled
// out by every other element because it has more than n/2 copies.
function majorityElement(nums: number[]): number {
    let candidate = nums[0];
    let count = 0;

    for (const num of nums) {
        if (count === 0) {
            // Pick a new candidate
            candidate = num;
        }
        // If current matches candidate, strengthen; otherwise weaken
        count += (num === candidate) ? 1 : -1;
    }

    return candidate;
}
```

**Complexity:** Boyer-Moore: O(n) time, O(1) space.

---

### More Array Problems to Practice

| # | Problem | Key Concept |
|---|---|---|
| 217 | Contains Duplicate | Basic hash set usage |
| 238 | Product of Array Except Self | Prefix/suffix product |
| 88 | Merge Sorted Array | Two pointer from the end |
| 283 | Move Zeroes | Read/write pointer |
| 27 | Remove Element | Read/write pointer |
| 189 | Rotate Array | Reverse trick |
| 53 | Maximum Subarray | Kadane's Algorithm |

---

### Problem 1.4: Maximum Subarray (Kadane's Algorithm)
**LeetCode #53 — Medium**

> Find the contiguous subarray with the largest sum.

**Why this problem:** Kadane's Algorithm is a classic that teaches you to think about "should I extend the current solution or start fresh?" — a mindset that applies to many DP problems later.

```typescript
function maxSubArray(nums: number[]): number {
    // currentSum: the max subarray sum ENDING at the current position
    // maxSum: the global best we've ever seen
    let currentSum = nums[0];
    let maxSum = nums[0];

    for (let i = 1; i < nums.length; i++) {
        // Key decision: is it better to extend the previous subarray
        // or start a new one from here?
        // If currentSum + nums[i] < nums[i], the previous subarray
        // is dragging us down — start fresh.
        currentSum = Math.max(nums[i], currentSum + nums[i]);

        maxSum = Math.max(maxSum, currentSum);
    }

    return maxSum;
}
```

**Dry run:**
```
nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]

i=0: currentSum=-2, maxSum=-2
i=1: max(1, -2+1=-1) → currentSum=1,  maxSum=1
i=2: max(-3, 1-3=-2) → currentSum=-2, maxSum=1
i=3: max(4, -2+4=2)  → currentSum=4,  maxSum=4
i=4: max(-1, 4-1=3)  → currentSum=3,  maxSum=4
i=5: max(2, 3+2=5)   → currentSum=5,  maxSum=5
i=6: max(1, 5+1=6)   → currentSum=6,  maxSum=6
i=7: max(-5, 6-5=1)  → currentSum=1,  maxSum=6
i=8: max(4, 1+4=5)   → currentSum=5,  maxSum=6

Return 6 (subarray [4, -1, 2, 1]) ✓
```

---

---

## Topic 2: Strings

### Why This Matters

Strings are immutable arrays of characters with their own set of common patterns. Many interview problems are string problems, and they frequently combine with hash maps and sliding window.

### Core Concepts to Master

**1. Immutability awareness:**
- In TypeScript/JavaScript, strings are immutable
- String concatenation in a loop is O(n²) — use arrays and `.join()`

**2. Character frequency analysis:**
- Anagrams, permutations, character counting
- Use a frequency map or a fixed-size array (26 for lowercase letters)

**3. Two-pointer on strings:**
- Palindrome checking
- Comparing from both ends

**4. String building patterns:**
```typescript
// BAD — O(n²) due to immutable string concatenation
let result = "";
for (const char of input) {
    result += char; // creates a new string each time
}

// GOOD — O(n)
const parts: string[] = [];
for (const char of input) {
    parts.push(char);
}
const result = parts.join("");
```

---

### Problem 2.1: Valid Palindrome
**LeetCode #125 — Easy**

> Determine if a string is a palindrome, considering only alphanumeric characters and ignoring cases.

**Why this problem:** Classic two-pointer on strings. Teaches character filtering and case normalization.

```typescript
function isPalindrome(s: string): boolean {
    // Two pointers from opposite ends
    let left = 0;
    let right = s.length - 1;

    while (left < right) {
        // Skip non-alphanumeric characters from the left
        while (left < right && !isAlphanumeric(s[left])) {
            left++;
        }
        // Skip non-alphanumeric characters from the right
        while (left < right && !isAlphanumeric(s[right])) {
            right--;
        }

        // Compare (case-insensitive)
        if (s[left].toLowerCase() !== s[right].toLowerCase()) {
            return false;
        }

        left++;
        right--;
    }

    return true;
}

function isAlphanumeric(char: string): boolean {
    const code = char.charCodeAt(0);
    return (
        (code >= 48 && code <= 57) ||  // 0-9
        (code >= 65 && code <= 90) ||  // A-Z
        (code >= 97 && code <= 122)    // a-z
    );
}
```

---

### Problem 2.2: Valid Anagram
**LeetCode #242 — Easy**

> Given two strings, determine if one is an anagram of the other.

**Why this problem:** Introduces the **character frequency map** pattern, which is foundational for sliding window string problems later.

```typescript
// Approach 1: Using a frequency map
function isAnagram(s: string, t: string): boolean {
    if (s.length !== t.length) return false;

    const freq: Map<string, number> = new Map();

    // Count characters in s
    for (const char of s) {
        freq.set(char, (freq.get(char) ?? 0) + 1);
    }

    // Subtract characters in t
    for (const char of t) {
        const count = freq.get(char);
        if (count === undefined || count === 0) {
            return false; // char in t not found in s, or already exhausted
        }
        freq.set(char, count - 1);
    }

    return true;
}

// Approach 2: Using a fixed-size array (faster for lowercase-only)
function isAnagramArray(s: string, t: string): boolean {
    if (s.length !== t.length) return false;

    const counts = new Array(26).fill(0);
    const aCode = 'a'.charCodeAt(0);

    for (let i = 0; i < s.length; i++) {
        counts[s.charCodeAt(i) - aCode]++;
        counts[t.charCodeAt(i) - aCode]--;
    }

    return counts.every(count => count === 0);
}
```

**Key takeaway:** The fixed-size array approach is a common trick when the character set is known and small. It avoids hash map overhead and is useful in many string problems.

---

### Problem 2.3: Longest Common Prefix
**LeetCode #14 — Easy**

> Find the longest common prefix among an array of strings.

```typescript
function longestCommonPrefix(strs: string[]): string {
    if (strs.length === 0) return "";

    // Use the first string as reference
    const reference = strs[0];

    for (let charIndex = 0; charIndex < reference.length; charIndex++) {
        const currentChar = reference[charIndex];

        // Check this character position against all other strings
        for (let strIndex = 1; strIndex < strs.length; strIndex++) {
            // If we've exceeded this string's length, or characters don't match
            if (
                charIndex >= strs[strIndex].length ||
                strs[strIndex][charIndex] !== currentChar
            ) {
                return reference.substring(0, charIndex);
            }
        }
    }

    // The entire first string is a prefix of all others
    return reference;
}
```

---

### More String Problems to Practice

| # | Problem | Key Concept |
|---|---|---|
| 344 | Reverse String | Two pointers, in-place |
| 387 | First Unique Character | Frequency map |
| 28 | Find Index of First Occurrence | String matching |
| 58 | Length of Last Word | Reverse traversal |
| 13 | Roman to Integer | Mapping + lookahead logic |
| 20 | Valid Parentheses | Stack (preview of stacks) |
| 409 | Longest Palindrome | Frequency counting + greedy |

---

---

## Topic 3: Hash Maps & Hash Sets

### Why This Matters

Hash maps are probably the single most useful data structure in coding interviews. They turn O(n) lookups into O(1), which is the key to optimizing brute-force solutions from O(n²) to O(n). If you're stuck on a problem, ask yourself: **"Can a hash map help here?"**

### Core Concepts to Master

**1. The Complement Lookup Pattern:**
Instead of searching for a pair with a nested loop, store values you've seen and check for the complement.

**2. Frequency Counting:**
Count occurrences of elements and reason about the frequency distribution.

**3. Grouping/Bucketing:**
Group elements by some computed key (e.g., sorted characters for anagram grouping).

**4. Index Storage:**
Store not just whether you've seen a value, but **where** or **when**.

**5. Set for Existence Checks:**
When you only need to know "have I seen this?" without associated data.

### TypeScript Hash Map/Set Essentials
```typescript
// Map — key-value pairs
const map = new Map<string, number>();
map.set("key", 1);
map.get("key");           // 1
map.has("key");            // true
map.delete("key");
map.size;                  // 0

// Set — unique values
const set = new Set<number>();
set.add(1);
set.has(1);                // true
set.delete(1);
set.size;                  // 0

// Object as map (only for string keys)
const obj: Record<string, number> = {};
obj["key"] = 1;
"key" in obj;              // true

// Iterating
for (const [key, value] of map) { }
for (const value of set) { }
```

---

### Problem 3.1: Two Sum
**LeetCode #1 — Easy**

> Given an array and a target, return indices of two numbers that add up to target.

**Why this problem:** The quintessential hash map problem. Every software engineer should be able to solve this in their sleep.

**Thinking process:**
- Brute force: for each element, search the rest of the array for `target - element` → O(n²)
- Key insight: while scanning, store each number in a hash map. For each new number, check if its complement (`target - num`) is already in the map.
- This replaces the inner O(n) search with an O(1) lookup.

```typescript
function twoSum(nums: number[], target: number): number[] {
    // Map from value → index
    const seen = new Map<number, number>();

    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];

        if (seen.has(complement)) {
            return [seen.get(complement)!, i];
        }

        // Store current number and its index for future lookups
        seen.set(nums[i], i);
    }

    return []; // no solution found
}
```

**Why we store as we go (not pre-populate):**
- Avoids using the same element twice
- One pass instead of two
- Clean and elegant

**Dry run:**
```
nums = [2, 7, 11, 15], target = 9

i=0: complement = 9-2 = 7, seen = {}, not found → store {2:0}
i=1: complement = 9-7 = 2, seen = {2:0}, FOUND! → return [0, 1] ✓
```

**Complexity:** O(n) time, O(n) space.

---

### Problem 3.2: Group Anagrams
**LeetCode #49 — Medium**

> Group strings that are anagrams of each other.

**Why this problem:** Teaches the "compute a key → group by that key" pattern using hash maps.

**Key insight:** Two strings are anagrams if and only if their **sorted characters** are identical. Use the sorted string as a hash map key.

```typescript
function groupAnagrams(strs: string[]): string[][] {
    const groups = new Map<string, string[]>();

    for (const str of strs) {
        // Create a canonical key for this anagram group
        // "eat" → "aet", "tea" → "aet", "ate" → "aet"
        const key = str.split('').sort().join('');

        if (!groups.has(key)) {
            groups.set(key, []);
        }
        groups.get(key)!.push(str);
    }

    return Array.from(groups.values());
}

// Optimization: use character frequency as key instead of sorting
// This is O(n*k) instead of O(n*k*log(k)) where k = max string length
function groupAnagramsOptimized(strs: string[]): string[][] {
    const groups = new Map<string, string[]>();

    for (const str of strs) {
        // Build a frequency-based key: "a1b0c0...z0" → more like "1#0#0#...#0"
        const counts = new Array(26).fill(0);
        const aCode = 'a'.charCodeAt(0);

        for (const char of str) {
            counts[char.charCodeAt(0) - aCode]++;
        }

        // Use the frequency array as a string key
        const key = counts.join('#');

        if (!groups.has(key)) {
            groups.set(key, []);
        }
        groups.get(key)!.push(str);
    }

    return Array.from(groups.values());
}
```

---

### Problem 3.3: Contains Duplicate II
**LeetCode #219 — Easy**

> Given an array and an integer k, check if there are two distinct indices i and j such that `nums[i] === nums[j]` and `|i - j| <= k`.

**Why this problem:** Combines hash maps with the **index storage** pattern and introduces a sliding window concept.

```typescript
function containsNearbyDuplicate(nums: number[], k: number): boolean {
    // Map from value → most recent index where we saw it
    const lastSeen = new Map<number, number>();

    for (let i = 0; i < nums.length; i++) {
        if (lastSeen.has(nums[i])) {
            const prevIndex = lastSeen.get(nums[i])!;
            if (i - prevIndex <= k) {
                return true;
            }
        }
        // Update to the most recent index
        lastSeen.set(nums[i], i);
    }

    return false;
}

// Alternative: sliding window with a Set (maintains a window of size k)
function containsNearbyDuplicateSet(nums: number[], k: number): boolean {
    const window = new Set<number>();

    for (let i = 0; i < nums.length; i++) {
        // If the window is too big, remove the element that fell out
        if (i > k) {
            window.delete(nums[i - k - 1]);
        }

        // If current element is already in the window → duplicate within range
        if (window.has(nums[i])) {
            return true;
        }

        window.add(nums[i]);
    }

    return false;
}
```

---

### Problem 3.4: Intersection of Two Arrays II
**LeetCode #350 — Easy**

> Find the intersection of two arrays (include duplicates based on minimum frequency).

```typescript
function intersect(nums1: number[], nums2: number[]): number[] {
    // Count frequencies of the smaller array (optimization)
    const freq = new Map<number, number>();

    for (const num of nums1) {
        freq.set(num, (freq.get(num) ?? 0) + 1);
    }

    const result: number[] = [];

    for (const num of nums2) {
        const count = freq.get(num);
        if (count !== undefined && count > 0) {
            result.push(num);
            freq.set(num, count - 1); // "use up" one occurrence
        }
    }

    return result;
}
```

---

### More Hash Map/Set Problems to Practice

| # | Problem | Key Concept |
|---|---|---|
| 383 | Ransom Note | Frequency counting |
| 205 | Isomorphic Strings | Bidirectional mapping |
| 290 | Word Pattern | Bidirectional mapping |
| 128 | Longest Consecutive Sequence | Set + intelligent scanning |
| 36 | Valid Sudoku | Set per row/col/box |
| 560 | Subarray Sum Equals K | Prefix sum + hash map |

---

### Problem 3.5: Longest Consecutive Sequence (Important Medium)
**LeetCode #128 — Medium**

> Find the length of the longest consecutive elements sequence. Must run in O(n).

**Why this problem:** Beautifully demonstrates how a hash set can replace sorting. Teaches you to think about "where does a sequence start?"

```typescript
function longestConsecutive(nums: number[]): number {
    const numSet = new Set(nums);
    let longest = 0;

    for (const num of numSet) {
        // Only start counting from the BEGINNING of a sequence.
        // A number is the start of a sequence if (num - 1) is NOT in the set.
        if (!numSet.has(num - 1)) {
            // This is the start of a new sequence
            let currentNum = num;
            let currentStreak = 1;

            // Count how far the sequence goes
            while (numSet.has(currentNum + 1)) {
                currentNum++;
                currentStreak++;
            }

            longest = Math.max(longest, currentStreak);
        }
    }

    return longest;
}
```

**Why this is O(n) and not O(n²):**
The key insight is the `if (!numSet.has(num - 1))` check. This ensures we only start the inner while loop at the **beginning** of each sequence. Each number is visited by the inner loop at most once across all iterations. So total work is O(n).

**Dry run:**
```
nums = [100, 4, 200, 1, 3, 2]
numSet = {100, 4, 200, 1, 3, 2}

num=100: 99 not in set → start! 100→101? no. streak=1
num=4:   3 IS in set → skip (not a sequence start)
num=200: 199 not in set → start! 200→201? no. streak=1
num=1:   0 not in set → start! 1→2→3→4→5? no. streak=4
num=3:   2 IS in set → skip
num=2:   1 IS in set → skip

Return 4 ✓
```

---

---

## Topic 4: Two Pointers

### Why This Matters

Two pointers is one of the most versatile techniques. It reduces O(n²) brute-force pair/triplet problems to O(n) or O(n²) respectively, and handles in-place array manipulation elegantly.

### Core Concepts to Master

**Three main flavors:**

**1. Opposite-direction (converging):**
- One pointer starts at the beginning, one at the end
- They move toward each other
- Used when the array is sorted and you're looking for a pair

**2. Same-direction (fast/slow or read/write):**
- Both pointers start at or near the beginning
- One moves faster or conditionally
- Used for in-place modifications, removing elements, partitioning

**3. Fast/slow (cycle detection):**
- Used primarily in linked lists
- Slow moves 1 step, fast moves 2 steps
- If they meet, there's a cycle

### How to Identify Two-Pointer Problems
- The array is **sorted** (or you can sort it)
- You need to find a **pair** that satisfies a condition
- You need to do something **in-place** with O(1) space
- You need to **partition** an array
- The problem involves **palindromes**

---

### Problem 4.1: Two Sum II — Input Array Is Sorted
**LeetCode #167 — Medium**

> Array is sorted. Find two numbers that add up to target. Return 1-indexed.

**Why this problem:** The classic converging two-pointer problem. Understand **why** moving the pointers works.

```typescript
function twoSumSorted(numbers: number[], target: number): number[] {
    let left = 0;
    let right = numbers.length - 1;

    while (left < right) {
        const sum = numbers[left] + numbers[right];

        if (sum === target) {
            return [left + 1, right + 1]; // 1-indexed
        } else if (sum < target) {
            // Sum is too small. We need a bigger sum.
            // Moving left pointer right increases the sum
            // (because the array is sorted).
            left++;
        } else {
            // Sum is too large. We need a smaller sum.
            // Moving right pointer left decreases the sum.
            right--;
        }
    }

    return []; // no solution
}
```

**Why this works (the proof intuition):**
- If `sum < target`: moving `right` left would only make sum smaller (pointless). So `left` must move right.
- If `sum > target`: moving `left` right would only make sum bigger (pointless). So `right` must move left.
- This means we never skip over the correct pair.

---

### Problem 4.2: Three Sum
**LeetCode #15 — Medium**

> Find all unique triplets that sum to zero.

**Why this problem:** One of the most frequently asked medium problems. Combines sorting + two pointers + duplicate handling.

**Thinking process:**
- Brute force: three nested loops → O(n³)
- Key insight: fix one element, then it becomes a **Two Sum II** problem on the remaining sorted array → O(n²)
- Must handle duplicates carefully

```typescript
function threeSum(nums: number[]): number[][] {
    // Sort first — enables two-pointer technique
    nums.sort((a, b) => a - b);
    const result: number[][] = [];

    for (let i = 0; i < nums.length - 2; i++) {
        // Optimization: if smallest element is positive, no triplet can sum to 0
        if (nums[i] > 0) break;

        // Skip duplicate values for the first element
        if (i > 0 && nums[i] === nums[i - 1]) continue;

        // Two-pointer search for the remaining two elements
        let left = i + 1;
        let right = nums.length - 1;
        const target = -nums[i]; // we need nums[left] + nums[right] = -nums[i]

        while (left < right) {
            const sum = nums[left] + nums[right];

            if (sum === target) {
                result.push([nums[i], nums[left], nums[right]]);

                // Skip duplicates for the second element
                while (left < right && nums[left] === nums[left + 1]) left++;
                // Skip duplicates for the third element
                while (left < right && nums[right] === nums[right - 1]) right--;

                // Move both pointers inward
                left++;
                right--;
            } else if (sum < target) {
                left++;
            } else {
                right--;
            }
        }
    }

    return result;
}
```

**Dry run (abbreviated):**
```
nums = [-1, 0, 1, 2, -1, -4]
sorted = [-4, -1, -1, 0, 1, 2]

i=0: nums[i]=-4, target=4
  left=1(-1), right=5(2): sum=1 < 4 → left++
  left=2(-1), right=5(2): sum=1 < 4 → left++
  left=3(0), right=5(2): sum=2 < 4 → left++
  left=4(1), right=5(2): sum=3 < 4 → left++
  left=5 >= right=5 → done

i=1: nums[i]=-1, target=1
  left=2(-1), right=5(2): sum=1 === 1 → found [-1,-1,2]! Skip dupes, left=3, right=4
  left=3(0), right=4(1): sum=1 === 1 → found [-1,0,1]! left=4, right=3
  left=4 >= right=3 → done

i=2: nums[i]=-1, same as nums[1] → skip

i=3: nums[i]=0, target=0
  left=4(1), right=5(2): sum=3 > 0 → right--
  left=4 >= right=4 → done

Result: [[-1,-1,2], [-1,0,1]] ✓
```

**Complexity:** O(n²) time, O(1) space (ignoring output and sort).

---

### Problem 4.3: Container With Most Water
**LeetCode #11 — Medium**

> Given heights of vertical lines, find two lines that form a container holding the most water.

**Why this problem:** A non-obvious two-pointer application. Teaches greedy reasoning about why the pointer movement is correct.

```typescript
function maxArea(height: number[]): number {
    let left = 0;
    let right = height.length - 1;
    let maxWater = 0;

    while (left < right) {
        // Water area = width × minimum height
        const width = right - left;
        const minHeight = Math.min(height[left], height[right]);
        const water = width * minHeight;

        maxWater = Math.max(maxWater, water);

        // KEY INSIGHT: move the pointer with the SHORTER line.
        // Why? The water level is limited by the shorter line.
        // Moving the taller line inward can only DECREASE width
        // without any chance of increasing height (still limited by shorter).
        // Moving the shorter line gives us a CHANCE of finding a taller line.
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }

    return maxWater;
}
```

---

### Problem 4.4: Move Zeroes
**LeetCode #283 — Easy**

> Move all zeroes to the end of the array while maintaining relative order of non-zero elements. In-place.

**Why this problem:** The same-direction read/write pointer pattern, also seen in remove duplicates.

```typescript
function moveZeroes(nums: number[]): void {
    // writePointer: where the next non-zero should be placed
    let writePointer = 0;

    // First pass: move all non-zero elements to the front
    for (let readPointer = 0; readPointer < nums.length; readPointer++) {
        if (nums[readPointer] !== 0) {
            nums[writePointer] = nums[readPointer];
            writePointer++;
        }
    }

    // Second pass: fill the rest with zeroes
    for (let i = writePointer; i < nums.length; i++) {
        nums[i] = 0;
    }
}

// Alternative: single pass with swap
function moveZeroesSwap(nums: number[]): void {
    let writePointer = 0;

    for (let readPointer = 0; readPointer < nums.length; readPointer++) {
        if (nums[readPointer] !== 0) {
            // Swap non-zero element to the write position
            [nums[writePointer], nums[readPointer]] =
                [nums[readPointer], nums[writePointer]];
            writePointer++;
        }
    }
}
```

---

### More Two-Pointer Problems to Practice

| # | Problem | Key Concept |
|---|---|---|
| 26 | Remove Duplicates from Sorted Array | Read/write pointer |
| 27 | Remove Element | Read/write pointer |
| 977 | Squares of a Sorted Array | Opposite-direction |
| 844 | Backspace String Compare | Reverse traversal pointer |
| 202 | Happy Number | Fast/slow cycle detection |
| 141 | Linked List Cycle | Fast/slow pointers |

---

---

## Topic 5: Sliding Window

### Why This Matters

Sliding window is the go-to technique for **contiguous subarray/substring** problems. It takes what would be an O(n²) or O(n³) brute force and reduces it to O(n) by maintaining a running state as the window slides.

### Core Concepts to Master

**The mental model:** Imagine a window (defined by `left` and `right` boundaries) sliding over the array/string. As `right` expands the window, you add the new element to your state. When the window violates a condition, you shrink from `left` until it's valid again.

**Two types:**

**1. Fixed-size window:**
- The window size is given (e.g., "maximum average subarray of length k")
- Slide the window one step at a time, adding the new element and removing the old

**2. Variable-size window:**
- The window size varies based on a condition
- Expand `right` to explore, contract `left` to maintain validity
- Track the best (longest/shortest) valid window

### How to Identify Sliding Window Problems
- Keywords: "contiguous subarray," "substring," "window"
- "Longest substring with at most K distinct characters"
- "Minimum window containing all characters"
- "Maximum sum of subarray of size K"
- You're looking for a contiguous segment that optimizes something

---

### Problem 5.1: Maximum Average Subarray I (Fixed Window)
**LeetCode #643 — Easy**

> Find the contiguous subarray of length k with the maximum average.

```typescript
function findMaxAverage(nums: number[], k: number): number {
    // Calculate the sum of the first window
    let windowSum = 0;
    for (let i = 0; i < k; i++) {
        windowSum += nums[i];
    }

    let maxSum = windowSum;

    // Slide the window: add the new element, remove the old
    for (let i = k; i < nums.length; i++) {
        windowSum += nums[i];       // add new element entering the window
        windowSum -= nums[i - k];   // remove element leaving the window
        maxSum = Math.max(maxSum, windowSum);
    }

    return maxSum / k;
}
```

**Visual:**
```
nums = [1, 12, -5, -6, 50, 3], k = 4

Window 1: [1, 12, -5, -6]  → sum = 2
Window 2: [12, -5, -6, 50] → sum = 51  ← slide: +50, -1
Window 3: [-5, -6, 50,  3] → sum = 42  ← slide: +3, -12

maxSum = 51, average = 51/4 = 12.75
```

---

### Problem 5.2: Longest Substring Without Repeating Characters (Variable Window)
**LeetCode #3 — Medium**

> Find the length of the longest substring without repeating characters.

**Why this problem:** The definitive variable-size sliding window problem. Asked very frequently.

**Thinking process:**
- Brute force: check every substring for uniqueness → O(n³)
- Sliding window: expand `right` to include new characters. If a duplicate is found, shrink from `left` until the duplicate is removed.
- Use a Set or Map to track characters in the current window.

```typescript
// Approach 1: Set-based (most intuitive)
function lengthOfLongestSubstring(s: string): number {
    const windowChars = new Set<string>();
    let left = 0;
    let maxLength = 0;

    for (let right = 0; right < s.length; right++) {
        // If the new character creates a duplicate,
        // shrink the window from the left until it doesn't
        while (windowChars.has(s[right])) {
            windowChars.delete(s[left]);
            left++;
        }

        // Add the new character
        windowChars.add(s[right]);

        // Update the best answer
        maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength;
}

// Approach 2: Map-based (optimal — jump left pointer directly)
function lengthOfLongestSubstringOptimal(s: string): number {
    // Map: character → last index where it appeared
    const lastIndex = new Map<string, number>();
    let left = 0;
    let maxLength = 0;

    for (let right = 0; right < s.length; right++) {
        // If this character was seen before and is within our current window,
        // jump left pointer past its previous occurrence
        if (lastIndex.has(s[right]) && lastIndex.get(s[right])! >= left) {
            left = lastIndex.get(s[right])! + 1;
        }

        lastIndex.set(s[right], right);
        maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength;
}
```

**Dry run (Approach 1):**
```
s = "abcabcbb"

right=0 'a': set={a}, window="a", maxLen=1
right=1 'b': set={a,b}, window="ab", maxLen=2
right=2 'c': set={a,b,c}, window="abc", maxLen=3
right=3 'a': 'a' in set! Remove from left:
             remove 'a', left=1. Now set={b,c}, 'a' not in set.
             Add 'a'. set={b,c,a}, window="bca", maxLen=3
right=4 'b': 'b' in set! Remove from left:
             remove 'b', left=2. Now set={c,a}, 'b' not in set.
             Add 'b'. set={c,a,b}, window="cab", maxLen=3
right=5 'c': 'c' in set! Remove from left:
             remove 'c', left=3. Now set={a,b}, 'c' not in set.
             Add 'c'. set={a,b,c}, window="abc", maxLen=3
right=6 'b': 'b' in set! Remove from left:
             remove 'a', left=4. 'b' still in set.
             remove 'b', left=5. Now set={c}, 'b' not in set.
             Add 'b'. set={c,b}, window="cb", maxLen=3
right=7 'b': 'b' in set! Remove from left:
             remove 'c', left=6. 'b' still in set.
             remove 'b', left=7. Now set={}, 'b' not in set.
             Add 'b'. set={b}, window="b", maxLen=3

Return 3 ✓
```

**Complexity:** O(n) time (each character is added to and removed from the set at most once), O(min(n, charset)) space.

---

### Problem 5.3: Minimum Size Subarray Sum
**LeetCode #209 — Medium**

> Find the minimum length subarray with sum ≥ target.

**Why this problem:** Variable window where you're looking for the **shortest** valid window (not longest).

```typescript
function minSubArrayLen(target: number, nums: number[]): number {
    let left = 0;
    let windowSum = 0;
    let minLength = Infinity;

    for (let right = 0; right < nums.length; right++) {
        // Expand: add element to window
        windowSum += nums[right];

        // Contract: while window is valid (sum >= target),
        // try to shrink it to find the minimum
        while (windowSum >= target) {
            minLength = Math.min(minLength, right - left + 1);
            windowSum -= nums[left];
            left++;
        }
    }

    return minLength === Infinity ? 0 : minLength;
}
```

**Key difference from "longest" problems:**
- For **longest**: update the answer **outside** the while loop (when the window is valid)
- For **shortest**: update the answer **inside** the while loop (just before shrinking)

---

### Problem 5.4: Permutation in String
**LeetCode #567 — Medium**

> Given s1 and s2, return true if s2 contains a permutation of s1.

**Why this problem:** Fixed-size window + frequency matching. A stepping stone to the harder "Minimum Window Substring."

```typescript
function checkInclusion(s1: string, s2: string): boolean {
    if (s1.length > s2.length) return false;

    const aCode = 'a'.charCodeAt(0);

    // Frequency arrays for s1 and the current window in s2
    const s1Freq = new Array(26).fill(0);
    const windowFreq = new Array(26).fill(0);

    // Count frequencies in s1
    for (const char of s1) {
        s1Freq[char.charCodeAt(0) - aCode]++;
    }

    // Initialize the first window
    for (let i = 0; i < s1.length; i++) {
        windowFreq[s2.charCodeAt(i) - aCode]++;
    }

    // Track how many of the 26 character frequencies match
    let matches = 0;
    for (let i = 0; i < 26; i++) {
        if (s1Freq[i] === windowFreq[i]) matches++;
    }

    // Slide the window
    for (let right = s1.length; right < s2.length; right++) {
        if (matches === 26) return true;

        // Add new character (entering window from right)
        const addIdx = s2.charCodeAt(right) - aCode;
        windowFreq[addIdx]++;
        if (windowFreq[addIdx] === s1Freq[addIdx]) {
            matches++;
        } else if (windowFreq[addIdx] === s1Freq[addIdx] + 1) {
            // Was matching, now it's not
            matches--;
        }

        // Remove old character (leaving window from left)
        const left = right - s1.length;
        const removeIdx = s2.charCodeAt(left) - aCode;
        windowFreq[removeIdx]--;
        if (windowFreq[removeIdx] === s1Freq[removeIdx]) {
            matches++;
        } else if (windowFreq[removeIdx] === s1Freq[removeIdx] - 1) {
            matches--;
        }
    }

    return matches === 26;
}
```

**The `matches` trick:** Instead of comparing the entire frequency array every time (O(26)), we maintain a `matches` counter that tracks how many character frequencies are equal between `s1Freq` and `windowFreq`. When `matches === 26`, all frequencies match → it's a permutation. This makes the comparison O(1) per step.

---

### The Sliding Window Template (Memorize This)

```typescript
function slidingWindowTemplate(s: string): number {
    // 1. Define your window state (map, set, counter, sum, etc.)
    const windowState = new Map<string, number>();
    let left = 0;
    let best = 0; // or Infinity for "minimum"

    // 2. Expand the window by moving right
    for (let right = 0; right < s.length; right++) {

        // 3. Add s[right] to window state
        // windowState.set(s[right], ...)

        // 4. Contract the window while it's invalid
        while (windowIsInvalid(windowState)) {
            // Remove s[left] from window state
            // windowState adjustment for s[left]
            left++;
        }

        // 5. Update the answer
        // For "longest": best = Math.max(best, right - left + 1)
        // For "shortest": update inside the while loop instead
        best = Math.max(best, right - left + 1);
    }

    return best;
}
```

---

### More Sliding Window Problems to Practice

| # | Problem | Key Concept |
|---|---|---|
| 121 | Best Time to Buy and Sell Stock | Not classic window, but related thinking |
| 219 | Contains Duplicate II | Fixed window + set |
| 424 | Longest Repeating Character Replacement | Variable window + frequency |
| 76 | Minimum Window Substring | Variable window (hard) — great for Phase 2 review |
| 438 | Find All Anagrams in a String | Fixed window + frequency matching |
| 1004 | Max Consecutive Ones III | Variable window with flip budget |

---

---

## Topic 6: Basic Sorting

### Why This Matters

Sorting is not just about implementing sort algorithms (you'll use built-in sort). It's about recognizing when **sorting the input first** transforms a hard problem into an easy one, and understanding the cost tradeoff.

### Core Concepts to Master

**1. Built-in sort usage:**
```typescript
// Sort numbers (BEWARE: default JS sort is lexicographic!)
const nums = [10, 1, 21, 2];

// WRONG:
nums.sort(); // [1, 10, 2, 21] — lexicographic!

// RIGHT:
nums.sort((a, b) => a - b); // [1, 2, 10, 21] — numeric ascending
nums.sort((a, b) => b - a); // [21, 10, 2, 1] — numeric descending
```

**2. Custom comparators:**
```typescript
// Sort objects by a property
intervals.sort((a, b) => a[0] - b[0]); // by start time
intervals.sort((a, b) => a[1] - b[1]); // by end time

// Sort strings by length, then alphabetically
words.sort((a, b) => a.length - b.length || a.localeCompare(b));
```

**3. Know when sorting helps:**
- Makes duplicates adjacent
- Enables two-pointer and binary search
- Makes greedy approaches work (e.g., intervals)
- Groups related elements

**4. Know when NOT to sort:**
- When order matters (preserving original indices)
- When you need better than O(n log n)
- When the problem specifically says O(n) time

**5. Sorting algorithm complexities (for knowledge, not implementation):**

| Algorithm | Best | Average | Worst | Space | Stable? |
|---|---|---|---|---|---|
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) | Yes |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) | No |
| Heap Sort | O(n log n) | O(n log n) | O(n log n) | O(1) | No |
| Counting Sort | O(n+k) | O(n+k) | O(n+k) | O(k) | Yes |
| Tim Sort (built-in) | O(n) | O(n log n) | O(n log n) | O(n) | Yes |

---

### Problem 6.1: Merge Intervals
**LeetCode #56 — Medium**

> Given an array of intervals, merge all overlapping intervals.

**Why this problem:** The canonical "sort first, then process" problem. Asked extremely frequently.

**Thinking process:**
- If we sort by start time, overlapping intervals become adjacent
- Then we do a single pass: if the current interval overlaps with the last merged interval, extend it; otherwise, start a new group

```typescript
function merge(intervals: number[][]): number[][] {
    // Sort by start time
    intervals.sort((a, b) => a[0] - b[0]);

    const merged: number[][] = [intervals[0]];

    for (let i = 1; i < intervals.length; i++) {
        const current = intervals[i];
        const lastMerged = merged[merged.length - 1];

        if (current[0] <= lastMerged[1]) {
            // Overlapping — extend the end of the last merged interval
            lastMerged[1] = Math.max(lastMerged[1], current[1]);
        } else {
            // Non-overlapping — add as new interval
            merged.push(current);
        }
    }

    return merged;
}
```

**Dry run:**
```
intervals = [[1,3], [2,6], [8,10], [15,18]]
sorted    = [[1,3], [2,6], [8,10], [15,18]]  (already sorted)

Start: merged = [[1,3]]

i=1: [2,6] — 2 <= 3 (overlap) → extend: merged = [[1,6]]
i=2: [8,10] — 8 > 6 (no overlap) → add: merged = [[1,6], [8,10]]
i=3: [15,18] — 15 > 10 (no overlap) → add: merged = [[1,6], [8,10], [15,18]]

Return [[1,6], [8,10], [15,18]] ✓
```

---

### Problem 6.2: Sort Colors (Dutch National Flag)
**LeetCode #75 — Medium**

> Sort an array of 0s, 1s, and 2s in-place without using sort. One pass.

**Why this problem:** Teaches the three-way partition (Dutch National Flag algorithm by Dijkstra). Important for understanding quicksort partitioning.

```typescript
function sortColors(nums: number[]): void {
    // Three pointers:
    // low: boundary for 0s (everything before low is 0)
    // mid: current element being examined
    // high: boundary for 2s (everything after high is 2)

    let low = 0;
    let mid = 0;
    let high = nums.length - 1;

    while (mid <= high) {
        if (nums[mid] === 0) {
            // Swap to the front (0s region)
            [nums[low], nums[mid]] = [nums[mid], nums[low]];
            low++;
            mid++;
        } else if (nums[mid] === 1) {
            // 1 is already in the right place (middle)
            mid++;
        } else {
            // nums[mid] === 2 — swap to the back (2s region)
            [nums[mid], nums[high]] = [nums[high], nums[mid]];
            high--;
            // DON'T advance mid — the swapped element needs to be examined
        }
    }
}
```

**Why mid doesn't advance when swapping with high:**
When we swap with `high`, the element that comes from `high` to `mid` hasn't been examined yet. It could be 0, 1, or 2. So we need to check it in the next iteration. When we swap with `low`, the element coming from `low` to `mid` is always a 1 (because `low ≤ mid`, and everything between `low` and `mid` has already been examined and determined to be 1).

---

### Problem 6.3: Valid Anagram (Sorting Approach)
**LeetCode #242 — Easy**

> Two strings are anagrams if sorting both produces the same result.

```typescript
function isAnagramSort(s: string, t: string): boolean {
    if (s.length !== t.length) return false;

    const sortedS = s.split('').sort().join('');
    const sortedT = t.split('').sort().join('');

    return sortedS === sortedT;
}
```

**Complexity:** O(n log n) time. Compare with the O(n) hash map approach — know both.

---

### Problem 6.4: Meeting Rooms
**LeetCode #252 — Easy (Premium) / Common Interview Problem**

> Given an array of meeting intervals `[start, end]`, determine if a person can attend all meetings.

```typescript
function canAttendMeetings(intervals: number[][]): boolean {
    // Sort by start time
    intervals.sort((a, b) => a[0] - b[0]);

    // Check for any overlap between consecutive meetings
    for (let i = 1; i < intervals.length; i++) {
        if (intervals[i][0] < intervals[i - 1][1]) {
            // Current meeting starts before the previous one ends
            return false;
        }
    }

    return true;
}
```

---

### Problem 6.5: Squares of a Sorted Array
**LeetCode #977 — Easy**

> Given a sorted array, return array of squares sorted.

**Why this problem:** The clever approach uses two pointers from both ends (since the largest squares are at the extremes of a sorted array with negatives).

```typescript
// Naive: square everything and sort → O(n log n)
// Optimal: two pointers → O(n)
function sortedSquares(nums: number[]): number[] {
    const n = nums.length;
    const result = new Array(n);
    let left = 0;
    let right = n - 1;

    // Fill result array from the END (largest to smallest)
    for (let writePos = n - 1; writePos >= 0; writePos--) {
        const leftSquare = nums[left] * nums[left];
        const rightSquare = nums[right] * nums[right];

        if (leftSquare > rightSquare) {
            result[writePos] = leftSquare;
            left++;
        } else {
            result[writePos] = rightSquare;
            right--;
        }
    }

    return result;
}
```

**Why this works:** In a sorted array like `[-4, -1, 0, 3, 10]`, the largest squares are at the **extremes** (left or right). By comparing squares from both ends and placing the larger one at the end of the result, we build the sorted result in one pass.

---

### More Sorting Problems to Practice

| # | Problem | Key Concept |
|---|---|---|
| 88 | Merge Sorted Array | Two pointer merge from the end |
| 349 | Intersection of Two Arrays | Sort + two pointers or set |
| 242 | Valid Anagram | Sort comparison vs frequency map |
| 179 | Largest Number | Custom comparator |
| 147 | Insertion Sort List | Linked list sort |
| 1086 | High Five | Sort + grouping |

---

---

## Phase 1: Putting It All Together

### Week 1 Daily Schedule

| Day | Focus | Problems |
|---|---|---|
| Day 1 | Arrays basics | #26 Remove Duplicates, #27 Remove Element, #283 Move Zeroes |
| Day 2 | Arrays + thinking | #121 Best Time to Buy/Sell Stock, #53 Maximum Subarray, #169 Majority Element |
| Day 3 | Strings | #125 Valid Palindrome, #242 Valid Anagram, #14 Longest Common Prefix, #387 First Unique Char |
| Day 4 | Hash Maps | #1 Two Sum, #217 Contains Duplicate, #219 Contains Duplicate II, #350 Intersection of Two Arrays II |
| Day 5 | Hash Maps advanced | #49 Group Anagrams, #128 Longest Consecutive Sequence, #383 Ransom Note |
| Day 6 | Review + fill gaps | Re-solve any problem you struggled with from memory |
| Day 7 | Rest or light review | Review notes, re-read patterns |

### Week 2 Daily Schedule

| Day | Focus | Problems |
|---|---|---|
| Day 8 | Two Pointers basics | #167 Two Sum II, #283 Move Zeroes (re-solve), #977 Squares of Sorted Array |
| Day 9 | Two Pointers advanced | #11 Container With Most Water, #15 Three Sum |
| Day 10 | Sliding Window fixed | #643 Maximum Average Subarray I, #567 Permutation in String |
| Day 11 | Sliding Window variable | #3 Longest Substring Without Repeating Characters, #209 Minimum Size Subarray Sum |
| Day 12 | Sorting | #56 Merge Intervals, #75 Sort Colors, #88 Merge Sorted Array |
| Day 13 | Mixed practice | #238 Product of Array Except Self, #424 Longest Repeating Character Replacement, #252 Meeting Rooms |
| Day 14 | Phase 1 assessment | Pick 3–4 unseen problems from the topics above and solve them timed (25 min each) |

### Checklist Before Moving to Phase 2

You should be able to confidently answer YES to all of these:

- [ ] I can implement two-pointer (both converging and same-direction) without hesitation
- [ ] I can write a sliding window (both fixed and variable) from a template in my head
- [ ] I instinctively reach for a hash map when I see an O(n²) lookup pattern
- [ ] I know when to sort first and the cost of doing so
- [ ] I can handle edge cases: empty arrays, single elements, all duplicates
- [ ] I can explain my approach clearly before coding
- [ ] I can trace through my code with an example and catch bugs
- [ ] I can analyze time and space complexity of my solutions

---
