defmodule Message do
  def send_msg(channel) do
    msg = IO.gets "> "

    AMQP.Basic.publish(channel, "", "hello", msg)
    IO.puts "> Sent: " <> msg

    # Infinite recursion
    send_msg(channel)
  end
end

# Create connection
{:ok, connection} = AMQP.Connection.open
IO.puts "... Connection created ..."

# Open channel
{:ok, channel} = AMQP.Channel.open(connection)
IO.puts "... Channel created ..."

# Declare queue
AMQP.Queue.declare(channel, "hello")

# Get message from IO, and send it
Message.send_msg(channel)
