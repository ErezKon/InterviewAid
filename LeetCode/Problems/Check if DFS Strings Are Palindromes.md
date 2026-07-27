# 3327. Check if DFS Strings Are Palindromes

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/check-if-dfs-strings-are-palindromes](https://leetcode.com/problems/check-if-dfs-strings-are-palindromes)
**Companies:** Google

---

## 1. Problem Description

Given a rooted tree where each node has a character, perform DFS and for each node, collect the "DFS string" (concatenation of characters in the subtree in DFS order). Return a boolean array indicating whether each node's DFS string is a palindrome.

---

## 2. Key Insight

> Build the full DFS string and track each node's substring range `[start, end)`. Then use **Eertree (palindromic tree)** or **Manacher's algorithm** to check if each substring is a palindrome efficiently.

---

## 3. Approach: Euler Tour + Manacher's — O(n) ✅

```
FUNCTION checkPalindromes(parent, s):
    // 1. Build tree, run DFS to get euler tour string
    dfsStr = ""
    entryTime = [0] * n
    exitTime = [0] * n
    timer = 0
    
    FUNCTION dfs(node):
        entryTime[node] = timer
        // visit children in sorted order
        FOR child IN children[node]:
            dfs(child)
        dfsStr += s[node]
        exitTime[node] = timer
        timer += 1
    
    dfs(0)
    
    // 2. Run Manacher's on dfsStr to find all palindromic substrings
    // 3. For each node, check if dfsStr[entry[node]..exit[node]] is palindrome
    
    result = [false] * n
    FOR node FROM 0 TO n-1:
        result[node] = isPalindrome(dfsStr, entryTime[node], exitTime[node])
    RETURN result
```

| Time | Space |
|------|-------|
| O(n) with Manacher's | O(n) |

---

## Key Takeaway

> Flatten subtrees into contiguous substrings via Euler tour, then use Manacher's algorithm for O(1) palindrome checks on any substring. Combines tree + string algorithm techniques.
