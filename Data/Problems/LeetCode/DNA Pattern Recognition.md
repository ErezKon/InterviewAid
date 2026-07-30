# 3475. DNA Pattern Recognition

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/dna-pattern-recognition](https://leetcode.com/problems/dna-pattern-recognition)
**Companies:** Google

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: SQL Pattern Matching](#approach-sql-pattern-matching)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

This is a **SQL problem**. Given a table `Samples` with columns `sample_id`, `dna_sequence` (string of A, T, C, G), and `species`, analyze each DNA sequence for specific patterns:
1. Whether it contains `"ATG"` (start codon)
2. Whether it contains a stop codon (`"TAA"`, `"TAG"`, or `"TGA"`)
3. Whether it contains a **TATA box** (`"TATA"`)
4. Whether it has a **GC-rich region** (3+ consecutive G or C characters, e.g., `"GGG"`, `"CCC"`, `"GCG"`, etc.)

Return boolean flags (1/0) for each pattern per sample, ordered by `sample_id`.

---

## Examples

```
Input:
Samples table:
| sample_id | dna_sequence         | species |
|-----------|----------------------|---------|
| 1         | ATGCCCGTAATGA        | Human   |
| 2         | GGTAAACCCTTAG        | Mouse   |

Output:
| sample_id | species | has_start | has_stop | has_tata | has_gc_rich |
|-----------|---------|-----------|----------|----------|-------------|
| 1         | Human   | 1         | 0        | 0        | 1           |
| 2         | Mouse   | 0         | 1        | 0        | 1           |
```

---

## Key Insight

> Use SQL `LIKE` patterns for simple substring matches and `REGEXP` for the GC-rich region (3+ consecutive G/C). Each pattern becomes a boolean column using `CASE WHEN ... THEN 1 ELSE 0`.

---

## Approach: SQL Pattern Matching

```sql
SELECT
    sample_id,
    species,
    CASE WHEN dna_sequence LIKE '%ATG%' THEN 1 ELSE 0 END AS has_start,
    CASE WHEN dna_sequence LIKE '%TAA%'
         OR dna_sequence LIKE '%TAG%'
         OR dna_sequence LIKE '%TGA%' THEN 1 ELSE 0 END AS has_stop,
    CASE WHEN dna_sequence LIKE '%TATA%' THEN 1 ELSE 0 END AS has_tata,
    CASE WHEN dna_sequence REGEXP '[GC]{3,}' THEN 1 ELSE 0 END AS has_gc_rich
FROM Samples
ORDER BY sample_id;
```

---

## Walkthrough

```
Sample 1: dna_sequence = "ATGCCCGTAATGA"
  has_start: "ATG" found at position 0 → 1
  has_stop:  "TAA"? no. "TAG"? no. "TGA"? no → 0
  has_tata:  "TATA"? no → 0
  has_gc_rich: "CCC" at position 3 → matches [GC]{3,} → 1

Sample 2: dna_sequence = "GGTAAACCCTTAG"
  has_start: "ATG"? no → 0
  has_stop:  "TAA" at position 2 → 1
  has_tata:  no → 0
  has_gc_rich: "CCC" at position 7 → 1
```

---

## Complexity Analysis

| Aspect | Complexity | Explanation |
|--------|-----------|-------------|
| **Time** | O(n × L) | n rows, L = max sequence length for pattern matching |
| **Space** | O(n) | Output rows |

---

## Key Takeaway

> **SQL `LIKE` handles simple substring search; `REGEXP` with character classes like `[GC]{3,}` handles repeating pattern detection. Combine both for multi-pattern DNA analysis.**
