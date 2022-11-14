<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PostResponse extends JsonResource
{
    public $status;
    public $message;

    /**
     * __construct
     *
     * @param  boolean $status
     * @param  string $message
     * @param  mixed $resource
     * @return void
     */
    public function __construct($status, $message = null, $resource = null)
    {
        parent::__construct($resource);
        $this->status  = $status ? 'success' : 'failed';
        $this->message = $message;
    }

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        if ($this->message != null && $this->resource != null) {
            return [
                'status'   => $this->status,
                'message'   => $this->message,
                'data'      => $this->resource
            ];
        }
        if ($this->message == null && $this->resource == null) {
            return [
                'status'   => $this->status
            ];
        }
        if ($this->message == null) {
            return [
                'status'   => $this->status,
                'data'      => $this->resource
            ];
        }
        if ($this->resource == null) {
            return [
                'status'   => $this->status,
                'message'   => $this->message,
            ];
        }
    }
}