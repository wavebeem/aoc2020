input = File.readlines("#{__dir__}/input.txt").map(&:to_i)
input.each_with_index do |n, i|
  input[i..].each do |m|
    if n + m == 2020
      puts(n * m)
    end
  end
end
