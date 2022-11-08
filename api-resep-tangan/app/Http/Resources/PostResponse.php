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
    public function __construct($status, $message, $resource = null)
    {
        parent::__construct($resource);
        $this->status  = $status;
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
        return [
            'status'   => $this->status ? 'success' : 'failed',
            'message'   => $this->message,
            'data'      => $this->resource
        ];
    }
}