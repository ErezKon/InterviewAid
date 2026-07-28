# 3327. Check if DFS Strings Are Palindromes

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/check-if-dfs-strings-are-palindromes](https://leetcode.com/problems/check-if-dfs-strings-are-palindromes)
**Companies:** Google

---

## 1. Problem Description

Given a rooted tree where each node stores a character, perform a depth‑first traversal. For every node, the "DFS string" is defined as the concatenation of characters of all nodes in its subtree visited in DFS order. Return a boolean array where each entry indicates whether the corresponding node’s DFS string is a palindrome.

---

## 2. Examples

| Input (parent array, chars) | Output | Explanation |
|-----------------------------|--------|-------------|
| `parent = [-1,0,0,1,1]`, `s = "abcba"` | `[true,true,false,true,true]` | Node 0’s subtree string is "abcba" (palindrome). Node 2’s subtree string is "c" (palindrome). Node 3’s subtree string is "ba" (not palindrome). |
| `parent = [-1,0,1]`, `s = "aaa"` | `[true,true,true]` | Every subtree string consists solely of `"a"` characters, all palindromes. |

---

## 3. Approach: Euler Tour + Manacher’s Algorithm — O(n) ✅

```text
FUNCTION checkPalindromes(parent, s):
    // Build adjacency list
    children ← MAP from node to list of children
    FOR i FROM 1 TO n-1:
        children[parent[i]].APPEND(i)

    // 1️⃣ Euler tour to flatten subtrees
    eulerStr ← ""
    entry ← ARRAY[n]
    exit ← ARRAY[n]
    timer ← 0

    FUNCTION dfs(node):
        entry[node] ← timer
        // visit children first (pre‑order)
        FOR child IN children[node]:
            dfs(child)
        eulerStr ← eulerStr + s[node]
        timer ← timer + 1
        exit[node] ← timer   // exclusive end index

    dfs(0)

    // 2️⃣ Run Manacher's algorithm on eulerStr to compute palindrome radius for every centre
    radius ← MANACHER(eulerStr)

    // 3️⃣ Helper to test palindrome of substring [l, r) using radius info
    FUNCTION isPalindrome(l, r):
        // centre of substring
        centre ← l + (r - l) / 2
        // length of substring
        length ← r - l
        RETURN radius[centre] ≥ length

    // 4️⃣ Build result for each node
    result ← ARRAY[n]
    FOR node FROM 0 TO n-1:
        result[node] ← isPalindrome(entry[node], exit[node])
    RETURN result
```

---

## 4. Walkthrough

Consider the tree `parent = [-1,0,0,1,1]` with characters `s = "abcba"`.
1. Build children lists: `0→[1,2]`, `1→[3,4]`.
2. DFS order (pre‑order) visits nodes `0,1,3,4,2`. The euler string after post‑order concatenation becomes `"cbaab"` (each node appended after its children).
3. Record entry/exit indices:
   - Node 0: entry 0, exit 5 → substring `"cbaab"` (which is "abcba" reversed, still palindrome).
   - Node 3: entry 2, exit 3 → substring `"a"` (palindrome).
   - Node 4: entry 3, exit 4 → substring `"b"` (palindrome).
   - Node 2: entry 4, exit 5 → substring `"c"` (palindrome).
4. Run Manacher’s on `"cbaab"` to obtain radius values allowing O(1) palindrome checks.
5. For each node, `isPalindrome(entry, exit)` returns the boolean array `[true,true,false,true,true]`.

---

## 5. Complexity Analysis

| Metric | Complexity |
|--------|------------|
| Time   | O(n) – one DFS, one linear‑time Manacher pass |
| Space  | O(n) – adjacency list, euler string, radius array |

---

## 6. Follow‑Up Questions

- How would the solution adapt if the DFS string needed to be checked for being a **k‑palindrome** (at most k mismatches)?
- Can the approach be extended to support dynamic updates to the tree (insert/delete nodes) while maintaining palindrome queries?
- What if the characters are Unicode strings with combining marks? Discuss handling of grapheme clusters.

---

## Key Takeaway

> Flatten each subtree into a contiguous substring via an Euler tour, then apply Manacher’s algorithm to answer palindrome queries in O(1) per node, achieving overall O(n) time.
