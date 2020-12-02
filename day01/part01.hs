import Control.Monad
import Data.List

main :: IO ()
main =
  let mul2 = uncurry (*)
   in do
        text <- readFile "day01/input.txt"
        let solutions = map mul2 $ findPairs $ map read $ words text
        forM_ solutions print

findPairs :: [Integer] -> [(Integer, Integer)]
findPairs list =
  [ (a, b)
    | (i, a) <- withIndex list,
      b <- drop i list,
      a + b == 2020
  ]

withIndex :: [b] -> [(Int, b)]
withIndex list =
  let fn a b = (a + 1, (a, b))
   in snd $ mapAccumL fn 0 list
